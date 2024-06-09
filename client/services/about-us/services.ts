"use server";
import { getClient } from "@/lib/ApolloClient";
import { GET_ABOUT_US } from "./queries";
import { revalidatePath } from "next/cache";

const client = getClient();

export async function getAboutUs() {
  const { data } = await client.query({
    query: GET_ABOUT_US,
    fetchPolicy: "no-cache",
  });
  revalidatePath(`/about-us`);

  return data.getAboutUs;
}
