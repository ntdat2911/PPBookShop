import { gql } from "@/codegen/__generated__";

export const GET_OVERVIEW_REVIEW_BY_ID = gql(`
 query getReviewOverViewById($id:String!){
  getReviewOverviewById(id:$id){
    averageRating
  countReviewList
  total
  }
}
`);

export const GET_REVIEW_BY_BOOK_ID = gql(`
query getReviewsByBookId($bookID:String!,$rating:Int!,$page:Int!,$size:Int!){
  getReviewsByBookId(params:{
    bookID:$bookID
    rating: $rating
    page:$page
    size:$size
  }){
    page
    size
    count
    records{
      UserID
      Username
      Comment
      ReviewTitle
      Rating
      CreatedAt
      ReviewID
    }}
  }
`);
