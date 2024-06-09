import { useQuery, gql, TypedDocumentNode } from "@apollo/client";
import { GPaginatedBookResponse } from "@/codegen/__generated__/graphql";

export const GET_BOOKS = gql(`
 query GetBooks($page: Int!,$size:Int!,$input:String!,$category:String!,$rating:String!,$author:String!,$sort:String!){
  getBooks(params:{
   page:$page
   size:$size
   input:$input
    category:$category
    rating:$rating
    author:$author
    sort:$sort
 }){
 page
 size
 count
   records{
    BookID
   BookTitle
   ImageURL
   BookPrice
   AuthorName
   Rating
   CategoryName
   Promotion{
      PromotionID
      PromotionName
      DiscountPercent
    }
   SoldQuantity
   }
 }
 }
`);

export const GET_BOOK = gql(`
query getBookById($id:String!){
  getBookById(id:$id){
    BookID
    CategoryID
    CategoryName
    BookTitle
    BookPrice
    BookDescription
    AuthorBy
    AuthorName
    ImageURL
    Rating
    Promotion{
      PromotionID
      PromotionName
      DiscountPercent
    }
    SoldQuantity

  }
}
`);

export const GET_ON_SALE_BOOKS = gql(`
query getOnSaleBooks($size: Float!){
  getOnSaleBooks(size:$size){
    BookID
    CategoryName
    BookTitle
    BookPrice
    AuthorName
    ImageURL
    Rating
    Promotion{
      DiscountPercent
    }
    SoldQuantity

  }
}
`);

export const GET_RECOMMENDED_BOOKS = gql(`
query getRecommendedBooks($size: Float!){
  getRecommendedBooks(size:$size){
    BookID
    CategoryName
    BookTitle
    BookPrice
    AuthorName
    ImageURL
    Rating
    Promotion{
      DiscountPercent
    }
    SoldQuantity

  }
}
`);

export const GET_POPULAR_BOOKS = gql(`
query getPopularBooks($size: Float!){
  getPopularBooks(size:$size){
    BookID
    CategoryName
    BookTitle
    BookPrice
    AuthorName
    ImageURL
    Rating
    Promotion{
      DiscountPercent
    }
    SoldQuantity
  }
}
`);
