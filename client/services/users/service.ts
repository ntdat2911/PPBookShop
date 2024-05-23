import { gql } from "@/codegen/__generated__";
import { UserEntity } from "@/codegen/__generated__/graphql";
export const GET_USER = gql(`
  query GetUser {
    user{
      Email
      Password
      UserName
      Name
      CreatedAt
      UpdatedAt
    }
  }
`);
