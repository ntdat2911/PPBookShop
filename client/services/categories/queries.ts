import { gql } from "@/codegen/__generated__";

export const GET_CATEGORIES = gql(`
query GetCategories{
  getCategories{
    CategoryID
    CategoryName
  }
}
`);
