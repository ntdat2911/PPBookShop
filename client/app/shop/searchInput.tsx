"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useSearchParamsContext } from "./searchParamsContext";
import { useDebouncedCallback } from "use-debounce";
export const SearchInput = () => {
  const { searchParams, setSearchParams } = useSearchParamsContext();
  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchParams({ ...searchParams, input: value, page: 1 });
  }, 500);
  return (
    <Input
      icon={<SearchIcon />}
      placeholder="Search"
      className="w-full rounded-full px-9 py-1 hover:border-slate-300"
      onChange={(e) => handleSearch(e.target.value)}
      // onKeyDown={(e) => {
      //   if (e.key === "Enter") {
      //     setSearchParams({ ...searchParams, input: input, page: 1 });
      //   }
      // }}
    />
  );
};
