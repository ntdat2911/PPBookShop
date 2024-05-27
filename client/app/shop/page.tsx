import { Input } from "@/components/ui/input";
import { ProductCard } from "./product-card";
import { SearchIcon } from "lucide-react";
import { SearchInput } from "./searchInput";
import { ListFilter } from "./listFilter";
import { SearchParamsContextWrapper } from "./searchParamsContext";
import { getClient } from "@/lib/ApolloClient";
import { GET_AUTHORS } from "@/services/authors/service";
import { FilterAuthor } from "@/services/authors/dto";

export default async function Page() {
  const client = getClient();
  const { data } = await client.query<{
    getAuthors: [FilterAuthor];
    data: any;
  }>({
    query: GET_AUTHORS,
  });
  const authorList: [FilterAuthor] = data.getAuthors;
  return (
    <SearchParamsContextWrapper>
      <div className="container py-8">
        <header className="flex flex-col items-center gap-2">
          <div className="w-full basis-3/4 pb-4">
            <SearchInput />
          </div>
        </header>
        <div className="flex flex-col mt-0 space-y-3">
          <div className="grid grid-cols-12 xs:flex xs:flex-row">
            <div className="col-span-2 sticky top-[60px] hidden h-[calc(100vh-200px)] md:flex md:shrink-0 md:flex-col md:justify-between px-1 xs:w-min">
              <ListFilter authorList={authorList} />
            </div>
            <div className=" col-span-10 mt-4 w-full min-w-0 flex flex-col">
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </SearchParamsContextWrapper>
  );
}
