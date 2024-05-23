import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@/codegen/__generated__";

const GetUser = gql(/* GraphQL */ `
  query GetUser() {
    user{
      Email
      Password
      UserName
    }
  }
`);

export default function Page() {
  // our query's result, data, is typed!
  const { loading, data } = useQuery(GetUser);
  console.log(data);
  return <div>SOS</div>;
}
