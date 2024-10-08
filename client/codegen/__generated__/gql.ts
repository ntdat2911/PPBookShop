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
    "\nquery getAboutUs{\ngetAboutUs\n}\n": types.GetAboutUsDocument,
    "\nquery getAddress($UserID:String!){\n  getAddressesByUserId(userId:$UserID){\n    Address\n    Phone\n    ReceiverName\n    IsDefault\n    AddressID\n    UserID\n  }\n}\n": types.GetAddressDocument,
    "\nmutation createAddress($UserID:String!,$Phone:String!,$ReceiverName:String!,$Address:String!,$IsDefault:Boolean!){\n  createAddress(userId:$UserID,phone:$Phone,receiverName:$ReceiverName,address:$Address,isDefault:$IsDefault){\n    Address\n    AddressID\n    UserID\n    ReceiverName\n    Phone\n    IsDefault\n  }\n}\n": types.CreateAddressDocument,
    "\nmutation updateAddress($AddressID:String!,$Phone:String!,$ReceiverName:String!,$Address:String!,$IsDefault:Boolean!){\n  updateAddress(addressId:$AddressID,phone:$Phone,receiverName:$ReceiverName,address:$Address,isDefault:$IsDefault){\n    Address\n    AddressID\n    UserID\n    ReceiverName\n    Phone\n    IsDefault\n  }\n}\n": types.UpdateAddressDocument,
    "\n query getAuthors{\n  getAuthors{\n    AuthorID\n    AuthorName\n  }\n}\n": types.GetAuthorsDocument,
    "\n  query getAuthorById($id:String!){\n    getAuthorById(id:$id){\n      AuthorID\n      AuthorName\n      Bio\n    }\n  }\n  ": types.GetAuthorByIdDocument,
    "\n query GetBooks($page: Int!,$size:Int!,$input:String!,$category:String!,$rating:String!,$author:String!,$sort:String!){\n  getBooks(params:{\n   page:$page\n   size:$size\n   input:$input\n    category:$category\n    rating:$rating\n    author:$author\n    sort:$sort\n }){\n page\n size\n count\n   records{\n    BookID\n   BookTitle\n   ImageURL\n   BookPrice\n   AuthorName\n   Rating\n   CategoryName\n   Promotion{\n      PromotionID\n      PromotionName\n      DiscountPercent\n    }\n   SoldQuantity\n   }\n }\n }\n": types.GetBooksDocument,
    "\nquery getBookById($id:String!){\n  getBookById(id:$id){\n    BookID\n    CategoryID\n    CategoryName\n    BookTitle\n    BookPrice\n    BookDescription\n    AuthorBy\n    AuthorName\n    ImageURL\n    Rating\n    Promotion{\n      PromotionID\n      PromotionName\n      DiscountPercent\n    }\n    SoldQuantity\n\n  }\n}\n": types.GetBookByIdDocument,
    "\nquery getOnSaleBooks($size: Float!){\n  getOnSaleBooks(size:$size){\n    BookID\n    CategoryName\n    BookTitle\n    BookPrice\n    AuthorName\n    ImageURL\n    Rating\n    Promotion{\n      DiscountPercent\n    }\n    SoldQuantity\n\n  }\n}\n": types.GetOnSaleBooksDocument,
    "\nquery getRecommendedBooks($size: Float!){\n  getRecommendedBooks(size:$size){\n    BookID\n    CategoryName\n    BookTitle\n    BookPrice\n    AuthorName\n    ImageURL\n    Rating\n    Promotion{\n      DiscountPercent\n    }\n    SoldQuantity\n\n  }\n}\n": types.GetRecommendedBooksDocument,
    "\nquery getPopularBooks($size: Float!){\n  getPopularBooks(size:$size){\n    BookID\n    CategoryName\n    BookTitle\n    BookPrice\n    AuthorName\n    ImageURL\n    Rating\n    Promotion{\n      DiscountPercent\n    }\n    SoldQuantity\n  }\n}\n": types.GetPopularBooksDocument,
    "\n query getCart($UserID:String!){\n  getCart(id:$UserID){\n    CartDetail\n  }\n}\n": types.GetCartDocument,
    "\n  mutation UpdateCart($UserID: String!,$CartDetail: String!){\n    createOrUpdateCart(UserID:$UserID,CartDetail:$CartDetail){\n      UserID\n      CartDetail\n    }\n  }\n  ": types.UpdateCartDocument,
    "\nquery GetCategories{\n  getCategories{\n    CategoryID\n    CategoryName\n  }\n}\n": types.GetCategoriesDocument,
    "\nmutation CreateOrder(\n  $UserID:String!,\n  $TotalPrice:Float!,\n  $Status:String!,\n  $AddressID:String!,\n  $PaymentMethod:String!,\n\t$OrderItems:String!\n){\n  createOrder(\n  data:{\n    UserID:$UserID\n    TotalPrice:$TotalPrice\n    Status:$Status\n    AddressID:$AddressID\n    PaymentMethod:$PaymentMethod\n    OrderItems:$OrderItems\n  }\n  )\n    {\n      OrderID\n      UserID\n      Status\n      TotalPrice\n      PaymentMethod\n    }\n}\n": types.CreateOrderDocument,
    "\nquery GetOrdersByUserID($userID:String!){\n  getOrdersByUserID(userID:$userID){\n    OrderID\n    UserID\n    Status\n    TotalPrice\n    PaymentMethod\n    OrderItems{\n      BookID\n      ItemQuantity\n      UnitItemPrice\n      Discount\n      TotalItemPrice\n      ImageURL\n      BookTitle\n    }\n  },\n}\n": types.GetOrdersByUserIdDocument,
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
export function gql(source: "\nquery getAboutUs{\ngetAboutUs\n}\n"): (typeof documents)["\nquery getAboutUs{\ngetAboutUs\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getAddress($UserID:String!){\n  getAddressesByUserId(userId:$UserID){\n    Address\n    Phone\n    ReceiverName\n    IsDefault\n    AddressID\n    UserID\n  }\n}\n"): (typeof documents)["\nquery getAddress($UserID:String!){\n  getAddressesByUserId(userId:$UserID){\n    Address\n    Phone\n    ReceiverName\n    IsDefault\n    AddressID\n    UserID\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation createAddress($UserID:String!,$Phone:String!,$ReceiverName:String!,$Address:String!,$IsDefault:Boolean!){\n  createAddress(userId:$UserID,phone:$Phone,receiverName:$ReceiverName,address:$Address,isDefault:$IsDefault){\n    Address\n    AddressID\n    UserID\n    ReceiverName\n    Phone\n    IsDefault\n  }\n}\n"): (typeof documents)["\nmutation createAddress($UserID:String!,$Phone:String!,$ReceiverName:String!,$Address:String!,$IsDefault:Boolean!){\n  createAddress(userId:$UserID,phone:$Phone,receiverName:$ReceiverName,address:$Address,isDefault:$IsDefault){\n    Address\n    AddressID\n    UserID\n    ReceiverName\n    Phone\n    IsDefault\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation updateAddress($AddressID:String!,$Phone:String!,$ReceiverName:String!,$Address:String!,$IsDefault:Boolean!){\n  updateAddress(addressId:$AddressID,phone:$Phone,receiverName:$ReceiverName,address:$Address,isDefault:$IsDefault){\n    Address\n    AddressID\n    UserID\n    ReceiverName\n    Phone\n    IsDefault\n  }\n}\n"): (typeof documents)["\nmutation updateAddress($AddressID:String!,$Phone:String!,$ReceiverName:String!,$Address:String!,$IsDefault:Boolean!){\n  updateAddress(addressId:$AddressID,phone:$Phone,receiverName:$ReceiverName,address:$Address,isDefault:$IsDefault){\n    Address\n    AddressID\n    UserID\n    ReceiverName\n    Phone\n    IsDefault\n  }\n}\n"];
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
export function gql(source: "\n query GetBooks($page: Int!,$size:Int!,$input:String!,$category:String!,$rating:String!,$author:String!,$sort:String!){\n  getBooks(params:{\n   page:$page\n   size:$size\n   input:$input\n    category:$category\n    rating:$rating\n    author:$author\n    sort:$sort\n }){\n page\n size\n count\n   records{\n    BookID\n   BookTitle\n   ImageURL\n   BookPrice\n   AuthorName\n   Rating\n   CategoryName\n   Promotion{\n      PromotionID\n      PromotionName\n      DiscountPercent\n    }\n   SoldQuantity\n   }\n }\n }\n"): (typeof documents)["\n query GetBooks($page: Int!,$size:Int!,$input:String!,$category:String!,$rating:String!,$author:String!,$sort:String!){\n  getBooks(params:{\n   page:$page\n   size:$size\n   input:$input\n    category:$category\n    rating:$rating\n    author:$author\n    sort:$sort\n }){\n page\n size\n count\n   records{\n    BookID\n   BookTitle\n   ImageURL\n   BookPrice\n   AuthorName\n   Rating\n   CategoryName\n   Promotion{\n      PromotionID\n      PromotionName\n      DiscountPercent\n    }\n   SoldQuantity\n   }\n }\n }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getBookById($id:String!){\n  getBookById(id:$id){\n    BookID\n    CategoryID\n    CategoryName\n    BookTitle\n    BookPrice\n    BookDescription\n    AuthorBy\n    AuthorName\n    ImageURL\n    Rating\n    Promotion{\n      PromotionID\n      PromotionName\n      DiscountPercent\n    }\n    SoldQuantity\n\n  }\n}\n"): (typeof documents)["\nquery getBookById($id:String!){\n  getBookById(id:$id){\n    BookID\n    CategoryID\n    CategoryName\n    BookTitle\n    BookPrice\n    BookDescription\n    AuthorBy\n    AuthorName\n    ImageURL\n    Rating\n    Promotion{\n      PromotionID\n      PromotionName\n      DiscountPercent\n    }\n    SoldQuantity\n\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getOnSaleBooks($size: Float!){\n  getOnSaleBooks(size:$size){\n    BookID\n    CategoryName\n    BookTitle\n    BookPrice\n    AuthorName\n    ImageURL\n    Rating\n    Promotion{\n      DiscountPercent\n    }\n    SoldQuantity\n\n  }\n}\n"): (typeof documents)["\nquery getOnSaleBooks($size: Float!){\n  getOnSaleBooks(size:$size){\n    BookID\n    CategoryName\n    BookTitle\n    BookPrice\n    AuthorName\n    ImageURL\n    Rating\n    Promotion{\n      DiscountPercent\n    }\n    SoldQuantity\n\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getRecommendedBooks($size: Float!){\n  getRecommendedBooks(size:$size){\n    BookID\n    CategoryName\n    BookTitle\n    BookPrice\n    AuthorName\n    ImageURL\n    Rating\n    Promotion{\n      DiscountPercent\n    }\n    SoldQuantity\n\n  }\n}\n"): (typeof documents)["\nquery getRecommendedBooks($size: Float!){\n  getRecommendedBooks(size:$size){\n    BookID\n    CategoryName\n    BookTitle\n    BookPrice\n    AuthorName\n    ImageURL\n    Rating\n    Promotion{\n      DiscountPercent\n    }\n    SoldQuantity\n\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getPopularBooks($size: Float!){\n  getPopularBooks(size:$size){\n    BookID\n    CategoryName\n    BookTitle\n    BookPrice\n    AuthorName\n    ImageURL\n    Rating\n    Promotion{\n      DiscountPercent\n    }\n    SoldQuantity\n  }\n}\n"): (typeof documents)["\nquery getPopularBooks($size: Float!){\n  getPopularBooks(size:$size){\n    BookID\n    CategoryName\n    BookTitle\n    BookPrice\n    AuthorName\n    ImageURL\n    Rating\n    Promotion{\n      DiscountPercent\n    }\n    SoldQuantity\n  }\n}\n"];
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
export function gql(source: "\nmutation CreateOrder(\n  $UserID:String!,\n  $TotalPrice:Float!,\n  $Status:String!,\n  $AddressID:String!,\n  $PaymentMethod:String!,\n\t$OrderItems:String!\n){\n  createOrder(\n  data:{\n    UserID:$UserID\n    TotalPrice:$TotalPrice\n    Status:$Status\n    AddressID:$AddressID\n    PaymentMethod:$PaymentMethod\n    OrderItems:$OrderItems\n  }\n  )\n    {\n      OrderID\n      UserID\n      Status\n      TotalPrice\n      PaymentMethod\n    }\n}\n"): (typeof documents)["\nmutation CreateOrder(\n  $UserID:String!,\n  $TotalPrice:Float!,\n  $Status:String!,\n  $AddressID:String!,\n  $PaymentMethod:String!,\n\t$OrderItems:String!\n){\n  createOrder(\n  data:{\n    UserID:$UserID\n    TotalPrice:$TotalPrice\n    Status:$Status\n    AddressID:$AddressID\n    PaymentMethod:$PaymentMethod\n    OrderItems:$OrderItems\n  }\n  )\n    {\n      OrderID\n      UserID\n      Status\n      TotalPrice\n      PaymentMethod\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetOrdersByUserID($userID:String!){\n  getOrdersByUserID(userID:$userID){\n    OrderID\n    UserID\n    Status\n    TotalPrice\n    PaymentMethod\n    OrderItems{\n      BookID\n      ItemQuantity\n      UnitItemPrice\n      Discount\n      TotalItemPrice\n      ImageURL\n      BookTitle\n    }\n  },\n}\n"): (typeof documents)["\nquery GetOrdersByUserID($userID:String!){\n  getOrdersByUserID(userID:$userID){\n    OrderID\n    UserID\n    Status\n    TotalPrice\n    PaymentMethod\n    OrderItems{\n      BookID\n      ItemQuantity\n      UnitItemPrice\n      Discount\n      TotalItemPrice\n      ImageURL\n      BookTitle\n    }\n  },\n}\n"];
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