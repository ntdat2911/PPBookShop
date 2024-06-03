/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n query getAuthors{\n  getAuthors{\n    AuthorID\n    AuthorName\n  }\n}\n": types.GetAuthorsDocument,
    "\n  query getAuthorById($id:String!){\n    getAuthorById(id:$id){\n      AuthorID\n      AuthorName\n      Bio\n    }\n  }\n  ": types.GetAuthorByIdDocument,
    "\n query GetBooks($page: Int!,$size:Int!,$input:String!,$category:String!,$rating:String!,$author:String!){\n  getBooks(params:{\n   page:$page\n   size:$size\n   input:$input\n    category:$category\n    rating:$rating\n    author:$author\n }){\n page\n size\n count\n   records{\n    BookID\n   BookTitle\n   ImageURL\n   BookPrice\n   AuthorName\n   Rating\n   CategoryName\n   }\n }\n }\n": types.GetBooksDocument,
    "\nquery getBookById($id:String!){\n  getBookById(id:$id){\n    BookID\n    CategoryID\n    CategoryName\n    BookTitle\n    BookPrice\n    BookDescription\n    AuthorBy\n    AuthorName\n    ImageURL\n    Rating\n  }\n}\n": types.GetBookByIdDocument,
    "\n query getCart($UserID:String!){\n  getCart(id:$UserID){\n    CartDetail\n  }\n}\n": types.GetCartDocument,
    "\n  mutation UpdateCart($UserID: String!,$CartDetail: String!){\n    createOrUpdateCart(UserID:$UserID,CartDetail:$CartDetail){\n      UserID\n      CartDetail\n    }\n  }\n  ": types.UpdateCartDocument,
    "\nquery GetCategories{\n  getCategories{\n    CategoryID\n    CategoryName\n  }\n}\n": types.GetCategoriesDocument,
    "\n query getReviewOverViewById($id:String!){\n  getReviewOverviewById(id:$id){\n    averageRating\n  countReviewList\n  total\n  }\n}\n": types.GetReviewOverViewByIdDocument,
    "\nquery getReviewsByBookId($bookID:String!,$rating:Int!,$page:Int!,$size:Int!){\n  getReviewsByBookId(params:{\n    bookID:$bookID\n    rating: $rating\n    page:$page\n    size:$size\n  }){\n    page\n    size\n    count\n    records{\n      UserID\n      Username\n      Comment\n      ReviewTitle\n      Rating\n      CreatedAt\n      ReviewID\n    }}\n  }\n": types.GetReviewsByBookIdDocument,
    "\nmutation CreateReview($bookID:String!,$userID:String!,$title:String!,$comment:String!,$rating:Int!){\ncreateReview(data:{\n  BookID:$bookID\n  UserID:$userID\n  ReviewTitle:$title\n  Comment:$comment\n  Rating:$rating\n}) {\n  ReviewID\n  Rating\n}\n}  \n": types.CreateReviewDocument,
    "\n  query GetUser {\n    user{\n      Email\n      Password\n      UserName\n      Name\n      CreatedAt\n      UpdatedAt\n    }\n  }\n": types.GetUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n query getAuthors{\n  getAuthors{\n    AuthorID\n    AuthorName\n  }\n}\n"): (typeof documents)["\n query getAuthors{\n  getAuthors{\n    AuthorID\n    AuthorName\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getAuthorById($id:String!){\n    getAuthorById(id:$id){\n      AuthorID\n      AuthorName\n      Bio\n    }\n  }\n  "): (typeof documents)["\n  query getAuthorById($id:String!){\n    getAuthorById(id:$id){\n      AuthorID\n      AuthorName\n      Bio\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n query GetBooks($page: Int!,$size:Int!,$input:String!,$category:String!,$rating:String!,$author:String!){\n  getBooks(params:{\n   page:$page\n   size:$size\n   input:$input\n    category:$category\n    rating:$rating\n    author:$author\n }){\n page\n size\n count\n   records{\n    BookID\n   BookTitle\n   ImageURL\n   BookPrice\n   AuthorName\n   Rating\n   CategoryName\n   }\n }\n }\n"): (typeof documents)["\n query GetBooks($page: Int!,$size:Int!,$input:String!,$category:String!,$rating:String!,$author:String!){\n  getBooks(params:{\n   page:$page\n   size:$size\n   input:$input\n    category:$category\n    rating:$rating\n    author:$author\n }){\n page\n size\n count\n   records{\n    BookID\n   BookTitle\n   ImageURL\n   BookPrice\n   AuthorName\n   Rating\n   CategoryName\n   }\n }\n }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getBookById($id:String!){\n  getBookById(id:$id){\n    BookID\n    CategoryID\n    CategoryName\n    BookTitle\n    BookPrice\n    BookDescription\n    AuthorBy\n    AuthorName\n    ImageURL\n    Rating\n  }\n}\n"): (typeof documents)["\nquery getBookById($id:String!){\n  getBookById(id:$id){\n    BookID\n    CategoryID\n    CategoryName\n    BookTitle\n    BookPrice\n    BookDescription\n    AuthorBy\n    AuthorName\n    ImageURL\n    Rating\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n query getCart($UserID:String!){\n  getCart(id:$UserID){\n    CartDetail\n  }\n}\n"): (typeof documents)["\n query getCart($UserID:String!){\n  getCart(id:$UserID){\n    CartDetail\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateCart($UserID: String!,$CartDetail: String!){\n    createOrUpdateCart(UserID:$UserID,CartDetail:$CartDetail){\n      UserID\n      CartDetail\n    }\n  }\n  "): (typeof documents)["\n  mutation UpdateCart($UserID: String!,$CartDetail: String!){\n    createOrUpdateCart(UserID:$UserID,CartDetail:$CartDetail){\n      UserID\n      CartDetail\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetCategories{\n  getCategories{\n    CategoryID\n    CategoryName\n  }\n}\n"): (typeof documents)["\nquery GetCategories{\n  getCategories{\n    CategoryID\n    CategoryName\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n query getReviewOverViewById($id:String!){\n  getReviewOverviewById(id:$id){\n    averageRating\n  countReviewList\n  total\n  }\n}\n"): (typeof documents)["\n query getReviewOverViewById($id:String!){\n  getReviewOverviewById(id:$id){\n    averageRating\n  countReviewList\n  total\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getReviewsByBookId($bookID:String!,$rating:Int!,$page:Int!,$size:Int!){\n  getReviewsByBookId(params:{\n    bookID:$bookID\n    rating: $rating\n    page:$page\n    size:$size\n  }){\n    page\n    size\n    count\n    records{\n      UserID\n      Username\n      Comment\n      ReviewTitle\n      Rating\n      CreatedAt\n      ReviewID\n    }}\n  }\n"): (typeof documents)["\nquery getReviewsByBookId($bookID:String!,$rating:Int!,$page:Int!,$size:Int!){\n  getReviewsByBookId(params:{\n    bookID:$bookID\n    rating: $rating\n    page:$page\n    size:$size\n  }){\n    page\n    size\n    count\n    records{\n      UserID\n      Username\n      Comment\n      ReviewTitle\n      Rating\n      CreatedAt\n      ReviewID\n    }}\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateReview($bookID:String!,$userID:String!,$title:String!,$comment:String!,$rating:Int!){\ncreateReview(data:{\n  BookID:$bookID\n  UserID:$userID\n  ReviewTitle:$title\n  Comment:$comment\n  Rating:$rating\n}) {\n  ReviewID\n  Rating\n}\n}  \n"): (typeof documents)["\nmutation CreateReview($bookID:String!,$userID:String!,$title:String!,$comment:String!,$rating:Int!){\ncreateReview(data:{\n  BookID:$bookID\n  UserID:$userID\n  ReviewTitle:$title\n  Comment:$comment\n  Rating:$rating\n}) {\n  ReviewID\n  Rating\n}\n}  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUser {\n    user{\n      Email\n      Password\n      UserName\n      Name\n      CreatedAt\n      UpdatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetUser {\n    user{\n      Email\n      Password\n      UserName\n      Name\n      CreatedAt\n      UpdatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;