"use server";
import { getClient } from "@/lib/ApolloClient";
import { GET_AUTHORS, GET_AUTHOR_BY_ID } from "./queries";
import { revalidatePath } from "next/cache";

const client = getClient();

export async function getAuthors() {
  const { data } = await client.query({
    query: GET_AUTHORS,
  });
  revalidatePath("/shop");
  return data.getAuthors;
}

export async function getAuthorById(id: string) {
  const { data } = await client.query({
    query: GET_AUTHOR_BY_ID,
    variables: { id },
  });
  return data.getAuthorById;
}
