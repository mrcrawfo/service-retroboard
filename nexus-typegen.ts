/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AuthType: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Board: { // root type
    creatorId: number; // Int!
    id: number; // Int!
    name: string; // String!
  }
  BoardColumn: { // root type
    boardId: number; // Int!
    creatorId: number; // Int!
    id: number; // Int!
    name: string; // String!
  }
  Card: { // root type
    boardId: number; // Int!
    columnId: number; // Int!
    creatorId: number; // Int!
    id: number; // Int!
    text: string; // String!
  }
  CardDeleteResponse: { // root type
    success: boolean; // Boolean!
  }
  Mutation: {};
  Query: {};
  User: { // root type
    email: string; // String!
    id: number; // Int!
    username: string; // String!
  }
  Vote: { // root type
    boardId: number; // Int!
    cardId: number; // Int!
    id: number; // Int!
    userId: number; // Int!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthType: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Board: { // field return type
    cards: Array<NexusGenRootTypes['Card'] | null> | null; // [Card]
    columns: Array<NexusGenRootTypes['BoardColumn'] | null> | null; // [BoardColumn]
    creator: NexusGenRootTypes['User'] | null; // User
    creatorId: number; // Int!
    id: number; // Int!
    name: string; // String!
  }
  BoardColumn: { // field return type
    board: NexusGenRootTypes['Board'] | null; // Board
    boardId: number; // Int!
    cards: Array<NexusGenRootTypes['Card'] | null> | null; // [Card]
    creator: NexusGenRootTypes['User'] | null; // User
    creatorId: number; // Int!
    id: number; // Int!
    name: string; // String!
  }
  Card: { // field return type
    board: NexusGenRootTypes['Board'] | null; // Board
    boardId: number; // Int!
    column: NexusGenRootTypes['BoardColumn'] | null; // BoardColumn
    columnId: number; // Int!
    creator: NexusGenRootTypes['User'] | null; // User
    creatorId: number; // Int!
    id: number; // Int!
    text: string; // String!
    votes: Array<NexusGenRootTypes['Vote'] | null>; // [Vote]!
  }
  CardDeleteResponse: { // field return type
    success: boolean; // Boolean!
  }
  Mutation: { // field return type
    addVoteToCard: NexusGenRootTypes['Vote']; // Vote!
    createBoard: NexusGenRootTypes['Board']; // Board!
    createCard: NexusGenRootTypes['Card']; // Card!
    createColumn: NexusGenRootTypes['BoardColumn']; // BoardColumn!
    deleteCard: NexusGenRootTypes['CardDeleteResponse']; // CardDeleteResponse!
    login: NexusGenRootTypes['AuthType']; // AuthType!
    register: NexusGenRootTypes['AuthType']; // AuthType!
    subtractVoteFromCard: NexusGenRootTypes['Vote'] | null; // Vote
    updateCard: NexusGenRootTypes['Card']; // Card!
  }
  Query: { // field return type
    getBoard: NexusGenRootTypes['Board'] | null; // Board
    getBoards: Array<NexusGenRootTypes['Board'] | null>; // [Board]!
    getBoardsByUserId: Array<NexusGenRootTypes['Board'] | null>; // [Board]!
    getCard: NexusGenRootTypes['Card'] | null; // Card
    getCardsByBoardId: NexusGenRootTypes['Card'][]; // [Card!]!
    getColumn: NexusGenRootTypes['BoardColumn'] | null; // BoardColumn
    getColumnsByBoardId: NexusGenRootTypes['BoardColumn'][]; // [BoardColumn!]!
    getUser: NexusGenRootTypes['User'] | null; // User
    getUsers: Array<NexusGenRootTypes['User'] | null>; // [User]!
    getVotesByCardId: Array<NexusGenRootTypes['Vote'] | null>; // [Vote]!
    me: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    boards: Array<NexusGenRootTypes['Board'] | null>; // [Board]!
    cards: Array<NexusGenRootTypes['Card'] | null>; // [Card]!
    email: string; // String!
    id: number; // Int!
    username: string; // String!
  }
  Vote: { // field return type
    boardId: number; // Int!
    cardId: number; // Int!
    id: number; // Int!
    user: NexusGenRootTypes['User'] | null; // User
    userId: number; // Int!
  }
}

export interface NexusGenFieldTypeNames {
  AuthType: { // field return type name
    token: 'String'
    user: 'User'
  }
  Board: { // field return type name
    cards: 'Card'
    columns: 'BoardColumn'
    creator: 'User'
    creatorId: 'Int'
    id: 'Int'
    name: 'String'
  }
  BoardColumn: { // field return type name
    board: 'Board'
    boardId: 'Int'
    cards: 'Card'
    creator: 'User'
    creatorId: 'Int'
    id: 'Int'
    name: 'String'
  }
  Card: { // field return type name
    board: 'Board'
    boardId: 'Int'
    column: 'BoardColumn'
    columnId: 'Int'
    creator: 'User'
    creatorId: 'Int'
    id: 'Int'
    text: 'String'
    votes: 'Vote'
  }
  CardDeleteResponse: { // field return type name
    success: 'Boolean'
  }
  Mutation: { // field return type name
    addVoteToCard: 'Vote'
    createBoard: 'Board'
    createCard: 'Card'
    createColumn: 'BoardColumn'
    deleteCard: 'CardDeleteResponse'
    login: 'AuthType'
    register: 'AuthType'
    subtractVoteFromCard: 'Vote'
    updateCard: 'Card'
  }
  Query: { // field return type name
    getBoard: 'Board'
    getBoards: 'Board'
    getBoardsByUserId: 'Board'
    getCard: 'Card'
    getCardsByBoardId: 'Card'
    getColumn: 'BoardColumn'
    getColumnsByBoardId: 'BoardColumn'
    getUser: 'User'
    getUsers: 'User'
    getVotesByCardId: 'Vote'
    me: 'User'
  }
  User: { // field return type name
    boards: 'Board'
    cards: 'Card'
    email: 'String'
    id: 'Int'
    username: 'String'
  }
  Vote: { // field return type name
    boardId: 'Int'
    cardId: 'Int'
    id: 'Int'
    user: 'User'
    userId: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addVoteToCard: { // args
      boardId: number; // Int!
      cardId: number; // Int!
      userId: number; // Int!
    }
    createBoard: { // args
      name: string; // String!
    }
    createCard: { // args
      boardId: number; // Int!
      columnId: number; // Int!
      text: string; // String!
    }
    createColumn: { // args
      boardId: number; // Int!
      name: string; // String!
    }
    deleteCard: { // args
      id: number; // Int!
    }
    login: { // args
      password: string; // String!
      username: string; // String!
    }
    register: { // args
      email: string; // String!
      password: string; // String!
      username: string; // String!
    }
    subtractVoteFromCard: { // args
      boardId: number; // Int!
      cardId: number; // Int!
      userId: number; // Int!
    }
    updateCard: { // args
      id: number; // Int!
      text: string; // String!
    }
  }
  Query: {
    getBoard: { // args
      id: number; // Int!
    }
    getCard: { // args
      id: number; // Int!
    }
    getCardsByBoardId: { // args
      boardId: number; // Int!
    }
    getColumn: { // args
      id: number; // Int!
    }
    getColumnsByBoardId: { // args
      boardId: number; // Int!
    }
    getUser: { // args
      id: number; // Int!
    }
    getVotesByCardId: { // args
      cardId: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}