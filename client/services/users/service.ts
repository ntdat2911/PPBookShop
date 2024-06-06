import { gql } from "@/codegen/__generated__";
import axios from "axios";
import { headers } from "next/headers";
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

export const updateImage = async (id: string, image: string, token: string) => {
  try {
    const data = await axios.put(
      "http://localhost:4000/api/users/update-image",
      { id, image },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
