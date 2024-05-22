"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProductList() {
  const { data: session } = useSession();
  useEffect(() => {
    async function fetchData() {
      console.log(process.env.SERVER_BASE_URL);
      const reqOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      };
      const req = await axios.get(
        process.env.SERVER_BASE_URL + "/api/auth/me",
        reqOptions
      );
      console.log(req);
    }
    if (session?.user.accessToken) fetchData();
  }, [session]);
  return (
    <>
      <div className="">PAL</div>
    </>
  );
}
