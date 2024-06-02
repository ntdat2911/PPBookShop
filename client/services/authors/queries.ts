import { gql } from "@apollo/client";

export const GET_AUTHORS = gql(`
 query getAuthors{
  getAuthors{
    AuthorID
    AuthorName
  }
}
`);

export const GET_AUTHOR_BY_ID = gql(`
  query getAuthorById($id:String!){
    getAuthorById(id:$id){
      AuthorID
      AuthorName
      Bio
    }
  }
  `);
