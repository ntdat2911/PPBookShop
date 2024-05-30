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
import { useRouter } from "next/navigation";
import qs from "qs";
interface ProductCardProps {
  pagyInfo: {
    page: number;
    size: number;
    count: number;
  };
  books: BookEntity[];
}

export const ProductCard = ({ pagyInfo, books }: ProductCardProps) => {
  const [page, setPage] = useState(pagyInfo.page);
  const { searchParams } = useSearchParamsContext();
  const router = useRouter();

  useEffect(() => {
    const query = qs.stringify({
      page: page.toString() || "1",
      input: searchParams.input,
    });
    if (searchParams.input == "") delete searchParams.input;
    router.push(`/shop?${query}`);
  }, [page, searchParams.input]);
  const paginationCreate = () => {
    const totalPage = Math.ceil(pagyInfo.count / pagyInfo.size);
    const currentPage = pagyInfo.page;
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
        {books ? (
          books.map((book) => (
            <div className="flex w-full justify-center" key={book.BookID}>
              <Card className="w-5/6 justify-center p-2">
                <Link href={`/product/detail/${book.BookID}`}>
                  <CardContent>
                    <Image
                      src={book.ImageURL}
                      alt={book.BookTitle}
                      width={300}
                      height={300}
                      className="w-[300px] h-[300px] object-contain"
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
      <div className="mt-8">{books && paginationCreate()}</div>
    </>
  );
};
