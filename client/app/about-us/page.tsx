"use client";
import { useEffect, useState } from "react";
import { getAboutUs } from "@/services/about-us/services";

export default function Page({ searchParams }: any) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const data = await getAboutUs();
      setContent(data);
    }

    fetchData();
  }, []);

  return (
    <div className="container pt-12">
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
