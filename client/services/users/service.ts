import { gql } from "@/codegen/__generated__";
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
