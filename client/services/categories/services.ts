"use server";
import { getClient } from "@/lib/ApolloClient";
import { GET_CATEGORIES } from "./queries";

const client = getClient();

export async function getCategories() {
  const { data } = await client.query({
    query: GET_CATEGORIES,
  });
  return data.getCategories;
}
