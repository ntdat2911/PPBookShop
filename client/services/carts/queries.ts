import { useQuery, gql, TypedDocumentNode } from "@apollo/client";
import { GPaginatedBookResponse } from "@/codegen/__generated__/graphql";

export const GET_CARTS = gql(`
 query getCart($UserID:String!){
  getCart(id:$UserID){
    CartDetail
  }
}
`);

export const UPDATE_CART = gql(`
  mutation UpdateCart($UserID: String!,$CartDetail: String!){
    createOrUpdateCart(UserID:$UserID,CartDetail:$CartDetail){
      UserID
      CartDetail
    }
  }
  `);
