"use server";
import { getClient } from "@/lib/ApolloClient";
import {
  GET_BOOK,
  GET_BOOKS,
  GET_ON_SALE_BOOKS,
  GET_POPULAR_BOOKS,
  GET_RECOMMENDED_BOOKS,
} from "./queries";
import { revalidatePath } from "next/cache";

const client = getClient();

export async function getBooks(
  page: number,
  size: number,
  input: string,
  category: string,
  rating: string,
  author: string,
  sort: string
) {
  const { data } = await client.query({
    query: GET_BOOKS,
    variables: {
      page: page,
      size: size,
      input: input,
      category: category,
      rating: rating,
      author: author,
      sort: sort,
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
    fetchPolicy: "no-cache",
  });
  revalidatePath(`/product/detail/${id}`);
  return data.getBookById;
}

export async function getOnSaleBooks(size: number) {
  const { data } = await client.query({
    query: GET_ON_SALE_BOOKS,
    variables: {
      size: size,
    },
    fetchPolicy: "no-cache",
  });
  revalidatePath("/");
  return data.getOnSaleBooks;
}

export async function getRecommendedBooks(size: number) {
  const { data } = await client.query({
    query: GET_RECOMMENDED_BOOKS,
    variables: {
      size: size,
    },
    fetchPolicy: "no-cache",
  });
  revalidatePath("/");
  return data.getRecommendedBooks;
}

export async function getPopularBooks(size: number) {
  const { data } = await client.query({
    query: GET_POPULAR_BOOKS,
    variables: {
      size: size,
    },
    fetchPolicy: "no-cache",
  });
  revalidatePath("/");
  return data.getPopularBooks;
}
