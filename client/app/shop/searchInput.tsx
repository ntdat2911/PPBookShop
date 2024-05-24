"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useSearchParamsContext } from "./searchParamsContext";

export const SearchInput = () => {
  const [input, setInput] = useState("");
  const { searchParams, setSearchParams } = useSearchParamsContext();
  return (
    <Input
      icon={<SearchIcon />}
      placeholder="Search"
      className="w-full rounded-full px-9 py-1 hover:border-slate-300"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setSearchParams({ ...searchParams, input: input });
        }
      }}
    />
  );
};
