import { PubSub, withFilter } from 'apollo-server';
import uuid from 'uuid/v1';
import bcrypt from 'bcryptjs';
import { find, isNil } from 'lodash';
import jwt from 'jsonwebtoken';
import * as GQL from './graphql';

const pubsub = new PubSub();

let channels: GQL.Channel[] = [];
let users: GQL.User[] = [];

const Query: GQL.QueryResolvers = {
  channels: () => channels,
  channel: (_root, { id }: GQL.QueryChannelArgs): GQL.Channel | null => {
    const channel = find<GQL.Channel>(channels, { id });
    if (isNil(channel)) {
      return null;
    }
    return channel;
  },
  currentUser: (_root, _args, { currentUser }: GQL.Query): GQL.User | null => {
    if (isNil(currentUser)) {
      return null;
    }

    return find<GQL.User>(users, { username: currentUser.username }) || null;
  }
};


const Mutation: GQL.MutationResolvers = {
  register: async (_parent: any, { username, password }: GQL.MutationRegisterArgs): Promise<GQL.User> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: GQL.User = {
      username,
      password: hashedPassword
    };

    users.push(user);

    return user;
  },
  login: async (_parent: any, { username, password }: GQL.MutationLoginArgs): Promise<GQL.LoginResponse> => {
    const user = find<GQL.User>(users, { username });

    if (isNil(user)) {
      throw new Error("Login failed");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Login failed")
    }

    const token = jwt.sign({ username }, 'very-secret-string', { expiresIn: "1h" });

    return {
      token,
      user
    };
  },
  createChannel: (_parent: any, { name }: GQL.MutationCreateChannelArgs, { currentUser }: GQL.Query): GQL.Channel => {
    if (isNil(currentUser)) {
      throw new Error('Not Authenticated')
    }

    const channel = find<GQL.Channel>(channels, { name });

    if (!isNil(channel)) {
      return channel;
    }

    const newChannel: GQL.Channel = {
      id: uuid(),
      name: name,
      messages: []
    };

    channels.push(newChannel)

    return newChannel;
  },
  createMessage: (_parent: any, { channelId, content }: GQL.MutationCreateMessageArgs, { currentUser }: GQL.Query): GQL.Message => {

    if (isNil(currentUser)) {
      throw new Error('Not Authenticated')
    }

    const channel = find<GQL.Channel>(channels, { id: channelId });

    if (isNil(channel)) {
      throw Error(`Channel with id ${channelId} not found!`);
    }

    const message: GQL.Message = {
      user: currentUser,
      content: content,
      createdAt: new Date().getTime()
    };

    channel.messages.push(message);

    pubsub.publish('messageAdded', {
      messageAdded: message,
      channelId: channelId
    });

    return message;
  }
};

const Subscription: GQL.SubscriptionResolvers = {
  messageAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(["messageAdded"]),
      (payload, variables) => payload.channelId === variables.channelId)
  }
};

export const resolvers: GQL.Resolvers = {
  Query,
  Mutation,
  Subscription
}