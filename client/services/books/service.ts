import { useQuery, gql, TypedDocumentNode } from "@apollo/client";
import { GPaginatedBookResponse } from "@/codegen/__generated__/graphql";

export const GET_BOOKS = gql(`
 query GetBooks($page: Int!,$size:Int!,$input:String!){
  getBooks(params:{
   page:$page
   size:$size
   input:$input
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
   }
 }
 }
`);
