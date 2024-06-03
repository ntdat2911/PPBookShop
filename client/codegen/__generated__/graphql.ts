/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AddressEntity = {
  __typename?: 'AddressEntity';
  Address: Scalars['String']['output'];
  AddressID: Scalars['String']['output'];
  IsDefault: Scalars['Boolean']['output'];
  Phone: Scalars['String']['output'];
  ReceiverName: Scalars['String']['output'];
  UserID: Scalars['String']['output'];
};

export type AuthorEntity = {
  __typename?: 'AuthorEntity';
  AuthorID: Scalars['String']['output'];
  AuthorName: Scalars['String']['output'];
  Bio: Scalars['String']['output'];
};

export type BookEntity = {
  __typename?: 'BookEntity';
  AuthorBy: Scalars['String']['output'];
  AuthorName: Scalars['String']['output'];
  BookDescription: Scalars['String']['output'];
  BookID: Scalars['String']['output'];
  BookPrice: Scalars['Float']['output'];
  BookTitle: Scalars['String']['output'];
  CategoryID: Scalars['String']['output'];
  CategoryName: Scalars['String']['output'];
  CreatedAt: Scalars['DateTime']['output'];
  ImageURL: Scalars['String']['output'];
  IsBookActive: Scalars['Boolean']['output'];
  IsOutOfStock: Scalars['Boolean']['output'];
  PublishDate: Scalars['DateTime']['output'];
  Rating: Scalars['Float']['output'];
  UpdatedAt: Scalars['DateTime']['output'];
};

export type CartEntity = {
  __typename?: 'CartEntity';
  CartDetail: Scalars['String']['output'];
  CartID: Scalars['String']['output'];
  CreatedAt: Scalars['DateTime']['output'];
  UserID: Scalars['String']['output'];
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  CategoryID: Scalars['String']['output'];
  CategoryName: Scalars['String']['output'];
  CreatedAt: Scalars['DateTime']['output'];
  IsCategoryActive: Scalars['Boolean']['output'];
  ParentCategoryID: Scalars['String']['output'];
  UpdatedAt: Scalars['DateTime']['output'];
};

export type CreateOrderInput = {
  AddressID: Scalars['String']['input'];
  OrderItems: Scalars['String']['input'];
  PaymentMethod: Scalars['String']['input'];
  Status: Scalars['String']['input'];
  TotalPrice: Scalars['Float']['input'];
  UserID: Scalars['String']['input'];
};

export type GCreateReviewRequest = {
  BookID: Scalars['String']['input'];
  Comment: Scalars['String']['input'];
  Rating: Scalars['Int']['input'];
  ReviewTitle: Scalars['String']['input'];
  UserID: Scalars['String']['input'];
};

export type GPaginatedBookResponse = {
  __typename?: 'GPaginatedBookResponse';
  count: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  records: Array<BookEntity>;
  size: Scalars['Int']['output'];
};

export type GPaginationRequest = {
  author?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Scalars['String']['input']>;
  page: Scalars['Int']['input'];
  rating?: InputMaybe<Scalars['String']['input']>;
  size: Scalars['Int']['input'];
};

export type GReviewPaginationRequest = {
  bookID: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
  size: Scalars['Int']['input'];
};

export type GReviewPaginationResponse = {
  __typename?: 'GReviewPaginationResponse';
  count: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  records: Array<ReviewEntity>;
  size: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAddress: AddressEntity;
  createOrUpdateCart: CartEntity;
  createOrder: OrderEntity;
  createReview: ReviewEntity;
  deleteCart: CartEntity;
  updateAddress: AddressEntity;
};


export type MutationCreateAddressArgs = {
  address: Scalars['String']['input'];
  isDefault: Scalars['Boolean']['input'];
  phone: Scalars['String']['input'];
  receiverName: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateOrUpdateCartArgs = {
  CartDetail: Scalars['String']['input'];
  UserID: Scalars['String']['input'];
};


export type MutationCreateOrderArgs = {
  data: CreateOrderInput;
};


export type MutationCreateReviewArgs = {
  data: GCreateReviewRequest;
};


export type MutationDeleteCartArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateAddressArgs = {
  address: Scalars['String']['input'];
  addressId: Scalars['String']['input'];
  isDefault: Scalars['Boolean']['input'];
  phone: Scalars['String']['input'];
  receiverName: Scalars['String']['input'];
};

export type OrderEntity = {
  __typename?: 'OrderEntity';
  AddressID: Scalars['String']['output'];
  CreatedAt: Scalars['DateTime']['output'];
  OrderID: Scalars['String']['output'];
  PaymentMethod: Scalars['String']['output'];
  Status: Scalars['String']['output'];
  TotalPrice: Scalars['Float']['output'];
  UserID: Scalars['String']['output'];
};

export type OrderItemEntity = {
  __typename?: 'OrderItemEntity';
  BookID: Scalars['String']['output'];
  BookPromotionID: Scalars['String']['output'];
  ItemQuantity: Scalars['Float']['output'];
  OrderID: Scalars['String']['output'];
  OrderItemID: Scalars['String']['output'];
  TotalItemPrice: Scalars['Float']['output'];
  UnitItemPrice: Scalars['Float']['output'];
};

export type OverviewReviewResponse = {
  __typename?: 'OverviewReviewResponse';
  averageRating: Scalars['Float']['output'];
  countReviewList: Array<Scalars['Float']['output']>;
  total: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAddressesByUserId: Array<AddressEntity>;
  getAuthorById: AuthorEntity;
  getAuthors: Array<AuthorEntity>;
  getBookById: BookEntity;
  getBooks: GPaginatedBookResponse;
  getCart: CartEntity;
  getCategories: Array<CategoryEntity>;
  getOrderItemsByOrderId: Array<OrderItemEntity>;
  getReviewOverviewById: OverviewReviewResponse;
  getReviewsByBookId: GReviewPaginationResponse;
  user: UserEntity;
};


export type QueryGetAddressesByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetAuthorByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetBookByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetBooksArgs = {
  params: GPaginationRequest;
};


export type QueryGetCartArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetOrderItemsByOrderIdArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryGetReviewOverviewByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetReviewsByBookIdArgs = {
  params: GReviewPaginationRequest;
};

export type ReviewEntity = {
  __typename?: 'ReviewEntity';
  BookID: Scalars['String']['output'];
  Comment: Scalars['String']['output'];
  CreatedAt: Scalars['DateTime']['output'];
  Rating: Scalars['Float']['output'];
  ReviewID: Scalars['String']['output'];
  ReviewTitle: Scalars['String']['output'];
  UserID: Scalars['String']['output'];
  Username: Scalars['String']['output'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  CreatedAt: Scalars['DateTime']['output'];
  Email: Scalars['String']['output'];
  ImageURL: Scalars['String']['output'];
  IsEmailConfirmed: Scalars['Boolean']['output'];
  IsUserActive: Scalars['Boolean']['output'];
  Name: Scalars['String']['output'];
  Password: Scalars['String']['output'];
  UpdatedAt: Scalars['DateTime']['output'];
  UserID: Scalars['String']['output'];
  UserName: Scalars['String']['output'];
};

export type GetAddressQueryVariables = Exact<{
  UserID: Scalars['String']['input'];
}>;


export type GetAddressQuery = { __typename?: 'Query', getAddressesByUserId: Array<{ __typename?: 'AddressEntity', Address: string, Phone: string, ReceiverName: string, IsDefault: boolean, AddressID: string, UserID: string }> };

export type CreateAddressMutationVariables = Exact<{
  UserID: Scalars['String']['input'];
  Phone: Scalars['String']['input'];
  ReceiverName: Scalars['String']['input'];
  Address: Scalars['String']['input'];
  IsDefault: Scalars['Boolean']['input'];
}>;


export type CreateAddressMutation = { __typename?: 'Mutation', createAddress: { __typename?: 'AddressEntity', Address: string, AddressID: string, UserID: string, ReceiverName: string, Phone: string, IsDefault: boolean } };

export type UpdateAddressMutationVariables = Exact<{
  AddressID: Scalars['String']['input'];
  Phone: Scalars['String']['input'];
  ReceiverName: Scalars['String']['input'];
  Address: Scalars['String']['input'];
  IsDefault: Scalars['Boolean']['input'];
}>;


export type UpdateAddressMutation = { __typename?: 'Mutation', updateAddress: { __typename?: 'AddressEntity', Address: string, AddressID: string, UserID: string, ReceiverName: string, Phone: string, IsDefault: boolean } };

export type GetAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorsQuery = { __typename?: 'Query', getAuthors: Array<{ __typename?: 'AuthorEntity', AuthorID: string, AuthorName: string }> };

export type GetAuthorByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAuthorByIdQuery = { __typename?: 'Query', getAuthorById: { __typename?: 'AuthorEntity', AuthorID: string, AuthorName: string, Bio: string } };

export type GetBooksQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
  input: Scalars['String']['input'];
  category: Scalars['String']['input'];
  rating: Scalars['String']['input'];
  author: Scalars['String']['input'];
}>;


export type GetBooksQuery = { __typename?: 'Query', getBooks: { __typename?: 'GPaginatedBookResponse', page: number, size: number, count: number, records: Array<{ __typename?: 'BookEntity', BookID: string, BookTitle: string, ImageURL: string, BookPrice: number, AuthorName: string, Rating: number, CategoryName: string }> } };

export type GetBookByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetBookByIdQuery = { __typename?: 'Query', getBookById: { __typename?: 'BookEntity', BookID: string, CategoryID: string, CategoryName: string, BookTitle: string, BookPrice: number, BookDescription: string, AuthorBy: string, AuthorName: string, ImageURL: string, Rating: number } };

export type GetCartQueryVariables = Exact<{
  UserID: Scalars['String']['input'];
}>;


export type GetCartQuery = { __typename?: 'Query', getCart: { __typename?: 'CartEntity', CartDetail: string } };

export type UpdateCartMutationVariables = Exact<{
  UserID: Scalars['String']['input'];
  CartDetail: Scalars['String']['input'];
}>;


export type UpdateCartMutation = { __typename?: 'Mutation', createOrUpdateCart: { __typename?: 'CartEntity', UserID: string, CartDetail: string } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'CategoryEntity', CategoryID: string, CategoryName: string }> };

export type CreateOrderMutationVariables = Exact<{
  UserID: Scalars['String']['input'];
  TotalPrice: Scalars['Float']['input'];
  Status: Scalars['String']['input'];
  AddressID: Scalars['String']['input'];
  PaymentMethod: Scalars['String']['input'];
  OrderItems: Scalars['String']['input'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'OrderEntity', OrderID: string, UserID: string, Status: string, TotalPrice: number, PaymentMethod: string } };

export type GetReviewOverViewByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetReviewOverViewByIdQuery = { __typename?: 'Query', getReviewOverviewById: { __typename?: 'OverviewReviewResponse', averageRating: number, countReviewList: Array<number>, total: number } };

export type GetReviewsByBookIdQueryVariables = Exact<{
  bookID: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type GetReviewsByBookIdQuery = { __typename?: 'Query', getReviewsByBookId: { __typename?: 'GReviewPaginationResponse', page: number, size: number, count: number, records: Array<{ __typename?: 'ReviewEntity', UserID: string, Username: string, Comment: string, ReviewTitle: string, Rating: number, CreatedAt: any, ReviewID: string }> } };

export type CreateReviewMutationVariables = Exact<{
  bookID: Scalars['String']['input'];
  userID: Scalars['String']['input'];
  title: Scalars['String']['input'];
  comment: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'ReviewEntity', ReviewID: string, Rating: number } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'UserEntity', Email: string, Password: string, UserName: string, Name: string, CreatedAt: any, UpdatedAt: any } };


export const GetAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"UserID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAddressesByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"UserID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Address"}},{"kind":"Field","name":{"kind":"Name","value":"Phone"}},{"kind":"Field","name":{"kind":"Name","value":"ReceiverName"}},{"kind":"Field","name":{"kind":"Name","value":"IsDefault"}},{"kind":"Field","name":{"kind":"Name","value":"AddressID"}},{"kind":"Field","name":{"kind":"Name","value":"UserID"}}]}}]}}]} as unknown as DocumentNode<GetAddressQuery, GetAddressQueryVariables>;
export const CreateAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"UserID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ReceiverName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"IsDefault"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"UserID"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"receiverName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ReceiverName"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Address"}}},{"kind":"Argument","name":{"kind":"Name","value":"isDefault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"IsDefault"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Address"}},{"kind":"Field","name":{"kind":"Name","value":"AddressID"}},{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"ReceiverName"}},{"kind":"Field","name":{"kind":"Name","value":"Phone"}},{"kind":"Field","name":{"kind":"Name","value":"IsDefault"}}]}}]}}]} as unknown as DocumentNode<CreateAddressMutation, CreateAddressMutationVariables>;
export const UpdateAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"AddressID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Phone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ReceiverName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"IsDefault"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"addressId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"AddressID"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Phone"}}},{"kind":"Argument","name":{"kind":"Name","value":"receiverName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ReceiverName"}}},{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Address"}}},{"kind":"Argument","name":{"kind":"Name","value":"isDefault"},"value":{"kind":"Variable","name":{"kind":"Name","value":"IsDefault"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Address"}},{"kind":"Field","name":{"kind":"Name","value":"AddressID"}},{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"ReceiverName"}},{"kind":"Field","name":{"kind":"Name","value":"Phone"}},{"kind":"Field","name":{"kind":"Name","value":"IsDefault"}}]}}]}}]} as unknown as DocumentNode<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const GetAuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAuthors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAuthors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AuthorID"}},{"kind":"Field","name":{"kind":"Name","value":"AuthorName"}}]}}]}}]} as unknown as DocumentNode<GetAuthorsQuery, GetAuthorsQueryVariables>;
export const GetAuthorByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAuthorById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAuthorById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AuthorID"}},{"kind":"Field","name":{"kind":"Name","value":"AuthorName"}},{"kind":"Field","name":{"kind":"Name","value":"Bio"}}]}}]}}]} as unknown as DocumentNode<GetAuthorByIdQuery, GetAuthorByIdQueryVariables>;
export const GetBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"author"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBooks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"author"},"value":{"kind":"Variable","name":{"kind":"Name","value":"author"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookID"}},{"kind":"Field","name":{"kind":"Name","value":"BookTitle"}},{"kind":"Field","name":{"kind":"Name","value":"ImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"BookPrice"}},{"kind":"Field","name":{"kind":"Name","value":"AuthorName"}},{"kind":"Field","name":{"kind":"Name","value":"Rating"}},{"kind":"Field","name":{"kind":"Name","value":"CategoryName"}}]}}]}}]}}]} as unknown as DocumentNode<GetBooksQuery, GetBooksQueryVariables>;
export const GetBookByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBookById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookID"}},{"kind":"Field","name":{"kind":"Name","value":"CategoryID"}},{"kind":"Field","name":{"kind":"Name","value":"CategoryName"}},{"kind":"Field","name":{"kind":"Name","value":"BookTitle"}},{"kind":"Field","name":{"kind":"Name","value":"BookPrice"}},{"kind":"Field","name":{"kind":"Name","value":"BookDescription"}},{"kind":"Field","name":{"kind":"Name","value":"AuthorBy"}},{"kind":"Field","name":{"kind":"Name","value":"AuthorName"}},{"kind":"Field","name":{"kind":"Name","value":"ImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"Rating"}}]}}]}}]} as unknown as DocumentNode<GetBookByIdQuery, GetBookByIdQueryVariables>;
export const GetCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"UserID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"UserID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CartDetail"}}]}}]}}]} as unknown as DocumentNode<GetCartQuery, GetCartQueryVariables>;
export const UpdateCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"UserID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"CartDetail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrUpdateCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"UserID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"UserID"}}},{"kind":"Argument","name":{"kind":"Name","value":"CartDetail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"CartDetail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"CartDetail"}}]}}]}}]} as unknown as DocumentNode<UpdateCartMutation, UpdateCartMutationVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CategoryID"}},{"kind":"Field","name":{"kind":"Name","value":"CategoryName"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"UserID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"TotalPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"AddressID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"PaymentMethod"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"OrderItems"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"UserID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"UserID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"TotalPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"TotalPrice"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"Status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Status"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"AddressID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"AddressID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"PaymentMethod"},"value":{"kind":"Variable","name":{"kind":"Name","value":"PaymentMethod"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"OrderItems"},"value":{"kind":"Variable","name":{"kind":"Name","value":"OrderItems"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OrderID"}},{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Status"}},{"kind":"Field","name":{"kind":"Name","value":"TotalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"PaymentMethod"}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const GetReviewOverViewByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getReviewOverViewById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReviewOverviewById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageRating"}},{"kind":"Field","name":{"kind":"Name","value":"countReviewList"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetReviewOverViewByIdQuery, GetReviewOverViewByIdQueryVariables>;
export const GetReviewsByBookIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getReviewsByBookId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReviewsByBookId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"bookID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Comment"}},{"kind":"Field","name":{"kind":"Name","value":"ReviewTitle"}},{"kind":"Field","name":{"kind":"Name","value":"Rating"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"ReviewID"}}]}}]}}]}}]} as unknown as DocumentNode<GetReviewsByBookIdQuery, GetReviewsByBookIdQueryVariables>;
export const CreateReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"BookID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"UserID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"ReviewTitle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"Comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"Rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ReviewID"}},{"kind":"Field","name":{"kind":"Name","value":"Rating"}}]}}]}}]} as unknown as DocumentNode<CreateReviewMutation, CreateReviewMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Password"}},{"kind":"Field","name":{"kind":"Name","value":"UserName"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;