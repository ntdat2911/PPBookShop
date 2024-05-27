"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_BOOKS } from "@/services/books/service";
import { BookEntity } from "@/codegen/__generated__/graphql";
import Image from "next/image";
import Link from "next/link";
import { useSearchParamsContext } from "./searchParamsContext";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export const ProductCard = () => {
  const { searchParams } = useSearchParamsContext();
  const [books, setBooks] = useState<BookEntity[]>([]);
  const [getSearchResult, { loading, data, error }] = useLazyQuery(GET_BOOKS);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const { input } = searchParams;

    getSearchResult({
      variables: { page: page, size: 9, input: input },
    });
  }, [searchParams, page, getSearchResult]);

  useEffect(() => {
    if (data && data.getBooks && data.getBooks.records) {
      setBooks(data.getBooks.records);
      console.log("data", data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const paginationCreate = () => {
    const totalPage = Math.ceil(data.getBooks.count / data.getBooks.size);
    const currentPage = data.getBooks.page;
    let pages = Array.from({ length: totalPage }, (_, i) => i + 1);

    // Limit the number of pages to 4
    if (pages.length > 4) {
      const startPage = Math.max(0, currentPage - 2);
      const endPage = startPage + 4;
      pages = pages.slice(startPage, endPage);
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              className={cn(
                currentPage <= 1 ? "pointer-events-none opacity-50" : undefined,
                "cursor-pointer"
              )}
              onClick={() => setPage(currentPage - 1)}
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setPage(page)}
                aria-current={currentPage === page ? "page" : undefined}
                className={cn(
                  currentPage === page ? "bg-gray-200" : undefined,
                  "cursor-pointer"
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPage > 4 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              aria-disabled={currentPage >= totalPage}
              tabIndex={currentPage >= totalPage ? -1 : undefined}
              className={cn(
                currentPage >= totalPage
                  ? "pointer-events-none opacity-50"
                  : undefined,
                "cursor-pointer"
              )}
              onClick={() => setPage(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="flex w-full justify-center" key={book.BookID}>
              <Card className="w-5/6 justify-center p-2">
                <Link href={`/shop/${book.BookID}`}>
                  <CardContent>
                    <Image
                      src={book.ImageURL}
                      alt={book.BookTitle}
                      width={300}
                      height={300}
                    />
                  </CardContent>
                  <CardFooter className="grid p-2 pt-0">
                    <CardTitle className="text-center w-full">
                      {book.BookTitle}
                    </CardTitle>
                    <p className="text-center w-full">{book.AuthorName}</p>
                    <CardDescription className="text-center w-full">
                      {book.BookPrice}$
                    </CardDescription>
                  </CardFooter>
                </Link>
              </Card>
            </div>
          ))
        ) : (
          <>No books found</>
        )}
      </div>
      <div className="mt-8">
        {data && data.getBooks && data.getBooks.records && paginationCreate()}
      </div>
    </>
  );
};
