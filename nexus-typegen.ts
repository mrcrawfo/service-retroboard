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
  ThemeColorName: "Blue" | "Green" | "Orange" | "Purple" | "Red" | "Yellow"
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
    message?: string | null; // String
    success?: boolean | null; // Boolean
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Board: { // root type
    creatorId: number; // Int!
    id: number; // Int!
    name: string; // String!
  }
  BoardColumn: { // root type
    boardId: number; // Int!
    color?: NexusGenEnums['ThemeColorName'] | null; // ThemeColorName
    creatorId: number; // Int!
    id: number; // Int!
    name: string; // String!
    slot: number; // Int!
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
  MoveCardResponse: { // root type
    success: boolean; // Boolean!
  }
  Mutation: {};
  Query: {};
  User: { // root type
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    lastName: string; // String!
    password?: string | null; // String
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

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthType: { // field return type
    message: string | null; // String
    success: boolean | null; // Boolean
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
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
    cardIds: Array<number | null>; // [Int]!
    cards: Array<NexusGenRootTypes['Card'] | null> | null; // [Card]
    color: NexusGenEnums['ThemeColorName'] | null; // ThemeColorName
    creator: NexusGenRootTypes['User'] | null; // User
    creatorId: number; // Int!
    id: number; // Int!
    name: string; // String!
    slot: number; // Int!
  }
  Card: { // field return type
    board: NexusGenRootTypes['Board'] | null; // Board
    boardId: number; // Int!
    column: NexusGenRootTypes['BoardColumn'] | null; // BoardColumn
    columnId: number; // Int!
    creator: NexusGenRootTypes['User'] | null; // User
    creatorId: number; // Int!
    groupedCardIds: Array<number | null>; // [Int]!
    id: number; // Int!
    text: string; // String!
    votes: Array<NexusGenRootTypes['Vote'] | null>; // [Vote]!
  }
  CardDeleteResponse: { // field return type
    success: boolean; // Boolean!
  }
  MoveCardResponse: { // field return type
    success: boolean; // Boolean!
  }
  Mutation: { // field return type
    addVoteToCard: NexusGenRootTypes['Vote']; // Vote!
    createBoard: NexusGenRootTypes['Board']; // Board!
    createCard: NexusGenRootTypes['Card']; // Card!
    createColumn: NexusGenRootTypes['BoardColumn']; // BoardColumn!
    deleteCard: NexusGenRootTypes['CardDeleteResponse']; // CardDeleteResponse!
    groupCard: NexusGenRootTypes['MoveCardResponse']; // MoveCardResponse!
    login: NexusGenRootTypes['AuthType']; // AuthType!
    moveCard: NexusGenRootTypes['MoveCardResponse']; // MoveCardResponse!
    register: NexusGenRootTypes['AuthType']; // AuthType!
    subtractVoteFromCard: NexusGenRootTypes['Vote'] | null; // Vote
    updateBoardName: NexusGenRootTypes['Board']; // Board!
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
    me: NexusGenRootTypes['AuthType'] | null; // AuthType
  }
  User: { // field return type
    boards: Array<NexusGenRootTypes['Board'] | null> | null; // [Board]
    cards: Array<NexusGenRootTypes['Card'] | null> | null; // [Card]
    email: string; // String!
    firstName: string; // String!
    id: number; // Int!
    lastName: string; // String!
    password: string | null; // String
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
    message: 'String'
    success: 'Boolean'
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
    cardIds: 'Int'
    cards: 'Card'
    color: 'ThemeColorName'
    creator: 'User'
    creatorId: 'Int'
    id: 'Int'
    name: 'String'
    slot: 'Int'
  }
  Card: { // field return type name
    board: 'Board'
    boardId: 'Int'
    column: 'BoardColumn'
    columnId: 'Int'
    creator: 'User'
    creatorId: 'Int'
    groupedCardIds: 'Int'
    id: 'Int'
    text: 'String'
    votes: 'Vote'
  }
  CardDeleteResponse: { // field return type name
    success: 'Boolean'
  }
  MoveCardResponse: { // field return type name
    success: 'Boolean'
  }
  Mutation: { // field return type name
    addVoteToCard: 'Vote'
    createBoard: 'Board'
    createCard: 'Card'
    createColumn: 'BoardColumn'
    deleteCard: 'CardDeleteResponse'
    groupCard: 'MoveCardResponse'
    login: 'AuthType'
    moveCard: 'MoveCardResponse'
    register: 'AuthType'
    subtractVoteFromCard: 'Vote'
    updateBoardName: 'Board'
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
    me: 'AuthType'
  }
  User: { // field return type name
    boards: 'Board'
    cards: 'Card'
    email: 'String'
    firstName: 'String'
    id: 'Int'
    lastName: 'String'
    password: 'String'
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
      slot: number; // Int!
    }
    deleteCard: { // args
      id: number; // Int!
    }
    groupCard: { // args
      cardId: number; // Int!
      fromColumnId: number; // Int!
      groupedCardIds: number; // Int!
      toColumnId: number; // Int!
    }
    login: { // args
      password: string; // String!
      username: string; // String!
    }
    moveCard: { // args
      cardId: number; // Int!
      fromColumnId: number; // Int!
      toColumnId: number; // Int!
    }
    register: { // args
      email: string; // String!
      firstName: string; // String!
      lastName: string; // String!
      password: string; // String!
      username: string; // String!
    }
    subtractVoteFromCard: { // args
      boardId: number; // Int!
      cardId: number; // Int!
      userId: number; // Int!
    }
    updateBoardName: { // args
      id: number; // Int!
      name: string; // String!
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

export type NexusGenEnumNames = keyof NexusGenEnums;

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