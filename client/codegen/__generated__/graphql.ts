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

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  CategoryID: Scalars['String']['output'];
  CategoryName: Scalars['String']['output'];
  CreatedAt: Scalars['DateTime']['output'];
  IsCategoryActive: Scalars['Boolean']['output'];
  ParentCategoryID: Scalars['String']['output'];
  UpdatedAt: Scalars['DateTime']['output'];
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
  createReview: ReviewEntity;
};


export type MutationCreateReviewArgs = {
  data: GCreateReviewRequest;
};

export type OverviewReviewResponse = {
  __typename?: 'OverviewReviewResponse';
  averageRating: Scalars['Float']['output'];
  countReviewList: Array<Scalars['Float']['output']>;
  total: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAuthorById: AuthorEntity;
  getAuthors: Array<AuthorEntity>;
  getBookById: BookEntity;
  getBooks: GPaginatedBookResponse;
  getCategories: Array<CategoryEntity>;
  getReviewOverviewById: OverviewReviewResponse;
  getReviewsByBookId: GReviewPaginationResponse;
  user: UserEntity;
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


export type GetBooksQuery = { __typename?: 'Query', getBooks: { __typename?: 'GPaginatedBookResponse', page: number, size: number, count: number, records: Array<{ __typename?: 'BookEntity', BookID: string, BookTitle: string, ImageURL: string, BookPrice: number, AuthorName: string }> } };

export type GetBookByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetBookByIdQuery = { __typename?: 'Query', getBookById: { __typename?: 'BookEntity', BookID: string, CategoryName: string, BookTitle: string, BookPrice: number, BookDescription: string, AuthorBy: string, AuthorName: string, ImageURL: string, Rating: number } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'CategoryEntity', CategoryID: string, CategoryName: string }> };

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


export const GetAuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAuthors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAuthors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AuthorID"}},{"kind":"Field","name":{"kind":"Name","value":"AuthorName"}}]}}]}}]} as unknown as DocumentNode<GetAuthorsQuery, GetAuthorsQueryVariables>;
export const GetAuthorByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAuthorById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAuthorById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AuthorID"}},{"kind":"Field","name":{"kind":"Name","value":"AuthorName"}},{"kind":"Field","name":{"kind":"Name","value":"Bio"}}]}}]}}]} as unknown as DocumentNode<GetAuthorByIdQuery, GetAuthorByIdQueryVariables>;
export const GetBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"author"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBooks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"author"},"value":{"kind":"Variable","name":{"kind":"Name","value":"author"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookID"}},{"kind":"Field","name":{"kind":"Name","value":"BookTitle"}},{"kind":"Field","name":{"kind":"Name","value":"ImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"BookPrice"}},{"kind":"Field","name":{"kind":"Name","value":"AuthorName"}}]}}]}}]}}]} as unknown as DocumentNode<GetBooksQuery, GetBooksQueryVariables>;
export const GetBookByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBookById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBookById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BookID"}},{"kind":"Field","name":{"kind":"Name","value":"CategoryName"}},{"kind":"Field","name":{"kind":"Name","value":"BookTitle"}},{"kind":"Field","name":{"kind":"Name","value":"BookPrice"}},{"kind":"Field","name":{"kind":"Name","value":"BookDescription"}},{"kind":"Field","name":{"kind":"Name","value":"AuthorBy"}},{"kind":"Field","name":{"kind":"Name","value":"AuthorName"}},{"kind":"Field","name":{"kind":"Name","value":"ImageURL"}},{"kind":"Field","name":{"kind":"Name","value":"Rating"}}]}}]}}]} as unknown as DocumentNode<GetBookByIdQuery, GetBookByIdQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CategoryID"}},{"kind":"Field","name":{"kind":"Name","value":"CategoryName"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetReviewOverViewByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getReviewOverViewById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReviewOverviewById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageRating"}},{"kind":"Field","name":{"kind":"Name","value":"countReviewList"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<GetReviewOverViewByIdQuery, GetReviewOverViewByIdQueryVariables>;
export const GetReviewsByBookIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getReviewsByBookId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReviewsByBookId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"bookID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"records"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Comment"}},{"kind":"Field","name":{"kind":"Name","value":"ReviewTitle"}},{"kind":"Field","name":{"kind":"Name","value":"Rating"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"ReviewID"}}]}}]}}]}}]} as unknown as DocumentNode<GetReviewsByBookIdQuery, GetReviewsByBookIdQueryVariables>;
export const CreateReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"BookID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"UserID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"ReviewTitle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"Comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"Rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ReviewID"}},{"kind":"Field","name":{"kind":"Name","value":"Rating"}}]}}]}}]} as unknown as DocumentNode<CreateReviewMutation, CreateReviewMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Password"}},{"kind":"Field","name":{"kind":"Name","value":"UserName"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"UpdatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;