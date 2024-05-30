"use server";
import { getClient } from "@/lib/ApolloClient";
import { GET_BOOK, GET_BOOKS } from "./queries";
import { revalidatePath } from "next/cache";

const client = getClient();

export async function getBooks(page: number, size: number, input: string) {
  const { data } = await client.query({
    query: GET_BOOKS,
    variables: {
      page: page,
      size: size,
      input: input,
    },
  });
  revalidatePath("/shop");
  return data.getBooks;
}

export async function getBookById(id: string) {
  const { data } = await client.query({
    query: GET_BOOK,
    variables: {
      id: id,
    },
  });
  revalidatePath(`/product/detail/${id}`);
  return data.getBookById;
}
