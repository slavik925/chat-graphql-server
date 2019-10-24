import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Channel = {
   __typename?: 'Channel',
  id: Scalars['ID'],
  name: Scalars['String'],
  messages: Array<Maybe<Message>>,
};

export type LoginResponse = {
   __typename?: 'LoginResponse',
  token?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};

export type Message = {
   __typename?: 'Message',
  user: User,
  content: Scalars['String'],
  createdAt: Scalars['Float'],
};

export type Mutation = {
   __typename?: 'Mutation',
  register: User,
  login: LoginResponse,
  createChannel: Channel,
  createMessage: Message,
};


export type MutationRegisterArgs = {
  username: Scalars['String'],
  password: Scalars['String']
};


export type MutationLoginArgs = {
  username: Scalars['String'],
  password: Scalars['String']
};


export type MutationCreateChannelArgs = {
  name: Scalars['String']
};


export type MutationCreateMessageArgs = {
  channelId: Scalars['ID'],
  content: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  channels?: Maybe<Array<Maybe<Channel>>>,
  channel?: Maybe<Channel>,
  currentUser?: Maybe<User>,
};


export type QueryChannelArgs = {
  id: Scalars['ID']
};

export type Subscription = {
   __typename?: 'Subscription',
  messageAdded?: Maybe<Message>,
};


export type SubscriptionMessageAddedArgs = {
  channelId: Scalars['ID']
};

export type User = {
   __typename?: 'User',
  username: Scalars['String'],
  password: Scalars['String'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Channel: ResolverTypeWrapper<Channel>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Message: ResolverTypeWrapper<Message>,
  User: ResolverTypeWrapper<User>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Mutation: ResolverTypeWrapper<{}>,
  LoginResponse: ResolverTypeWrapper<LoginResponse>,
  Subscription: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Channel: Channel,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Message: Message,
  User: User,
  Float: Scalars['Float'],
  Mutation: {},
  LoginResponse: LoginResponse,
  Subscription: {},
  Boolean: Scalars['Boolean'],
};

export type ChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  messages?: Resolver<Array<Maybe<ResolversTypes['Message']>>, ParentType, ContextType>,
};

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  register?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'username' | 'password'>>,
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'username' | 'password'>>,
  createChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationCreateChannelArgs, 'name'>>,
  createMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'channelId' | 'content'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  channels?: Resolver<Maybe<Array<Maybe<ResolversTypes['Channel']>>>, ParentType, ContextType>,
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType, RequireFields<QueryChannelArgs, 'id'>>,
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  messageAdded?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "messageAdded", ParentType, ContextType, RequireFields<SubscriptionMessageAddedArgs, 'channelId'>>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Channel?: ChannelResolvers<ContextType>,
  LoginResponse?: LoginResponseResolvers<ContextType>,
  Message?: MessageResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
