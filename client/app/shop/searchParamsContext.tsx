"use client";
import { createContext, useContext, useState } from "react";

const SearchParamsContext = createContext<any>(undefined);

export function SearchParamsContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  let [searchParams, setSearchParams] = useState<object>({
    page: 1,
    input: "",
    category: [],
    rating: [],
    author: "",
  });
  return (
    <SearchParamsContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchParamsContext.Provider>
  );
}

export function useSearchParamsContext() {
  return useContext(SearchParamsContext);
}
