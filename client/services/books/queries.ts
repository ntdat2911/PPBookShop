import { useQuery, gql, TypedDocumentNode } from "@apollo/client";
import { GPaginatedBookResponse } from "@/codegen/__generated__/graphql";

export const GET_BOOKS = gql(`
 query GetBooks($page: Int!,$size:Int!,$input:String!,$category:String!,$rating:String!,$author:String!){
  getBooks(params:{
   page:$page
   size:$size
   input:$input
    category:$category
    rating:$rating
    author:$author
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
  }
}
`);
