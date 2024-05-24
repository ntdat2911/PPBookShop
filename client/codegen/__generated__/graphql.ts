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

export type BookEntity = {
  __typename?: 'BookEntity';
  AuthorBy: Scalars['String']['output'];
  BookDescription: Scalars['String']['output'];
  BookID: Scalars['String']['output'];
  BookPrice: Scalars['Float']['output'];
  BookTitle: Scalars['String']['output'];
  CategoryID: Scalars['String']['output'];
  CreatedAt: Scalars['DateTime']['output'];
  ImageURL: Scalars['String']['output'];
  IsBookActive: Scalars['Boolean']['output'];
  IsOutOfStock: Scalars['Boolean']['output'];
  PublishDate: Scalars['DateTime']['output'];
  Rating: Scalars['Float']['output'];
  UpdatedAt: Scalars['DateTime']['output'];
};

export type GPaginatedBookResponse = {
  __typename?: 'GPaginatedBookResponse';
  count: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  records: Array<BookEntity>;
  size: Scalars['Int']['output'];
};

export type GPaginationRequest = {
  input?: InputMaybe<Scalars['String']['input']>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  getBooks: GPaginatedBookResponse;
  user: UserEntity;
};


export type QueryGetBooksArgs = {
  params: GPaginationRequest;
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

export type GetBooksQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
  input: Scalars['String']['input'];
}>;


export type GetBooksQuery = { __typename?: 'Query', getBooks: { __typename?: 'GPaginatedBookResponse', page: number, records: Array<{ __typename?: 'BookEntity', BookTitle: string, BookDescription: string }> } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'UserEntity', Email: string, Password: string, UserName: string, Name: string, CreatedAt: any, UpdatedAt: any } };


export const GetBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBooks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookTitle"}},{"kind":"Field","name":{"kind":"Name","value":"BookDescription"}}]}}]}}]}}]} as unknown as DocumentNode<GetBooksQuery, GetBooksQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Password"}},{"kind":"Field","name":{"kind":"Name","value":"UserName"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;