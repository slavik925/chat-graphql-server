import { ApolloServer, ServerInfo } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

type ConnectionParams = {
  authToken: string;
}

const getCurrentUser = (token: string) => {
  try {
    if (token) {
      return jwt.verify(token, 'very-secret-string');
    }
    return null;
  } catch {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context;
    } else {
      const tokenWithBearer = req.headers.authorization || '';
      const token = tokenWithBearer.split(' ')[1];
      const currentUser = getCurrentUser(token);

      return {
        currentUser
      }
    }
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      const { authToken } = (connectionParams as ConnectionParams);

      if (authToken) {
        const currentUser = getCurrentUser(authToken);
        if (!currentUser) {
          throw new Error('Missing auth token!');
        }

        return {
          currentUser
        };
      }
      throw new Error('Missing auth token!');
    },
  },
  formatError: (error) => {
    console.error(error);
    return error;
  }
});

server.listen().then(({ url, subscriptionsUrl }: ServerInfo) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
})