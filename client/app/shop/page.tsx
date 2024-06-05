import { ProductCard } from "./product-card";
import { SearchInput } from "./searchInput";
import { ListFilter } from "./listFilter";
import { SearchParamsContextWrapper } from "./searchParamsContext";
import { getAuthors } from "@/services/authors/services";
import { getBooks } from "@/services/books/services";
import {
  AuthorEntity,
  CategoryEntity,
  GPaginatedBookResponse,
} from "@/codegen/__generated__/graphql";
import { count } from "console";
import { getCategories } from "@/services/categories/services";
import { OptionType } from "@/components/ui/multi-select";

export default async function Page({ searchParams }: any) {
  const page = parseInt(searchParams.page) || 1;
  const size = parseInt(searchParams.size) || 6;
  const [authorList, bookList, categoryList]: [
    authorList: AuthorEntity[],
    bookList: GPaginatedBookResponse,
    categoryList: any[]
  ] = await Promise.all([
    getAuthors(),
    getBooks(
      page,
      size,
      searchParams.input || "",
      searchParams.category || "",
      searchParams.rating || "",
      searchParams.author || "",
      searchParams.sort || ""
    ),
    getCategories(),
  ]);
  const categoryLists: OptionType[] = categoryList.map((category) => {
    return {
      id: category.CategoryID,
      tag_name: category.CategoryName,
    };
  });

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
              <ListFilter
                authorList={authorList}
                categoryList={categoryLists}
              />
            </div>
            <div className=" col-span-10 mt-4 w-full min-w-0 flex flex-col">
              <ProductCard
                books={bookList.records}
                pagyInfo={{
                  page: bookList.page,
                  size: bookList.size,
                  count: bookList.count,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </SearchParamsContextWrapper>
  );
}
