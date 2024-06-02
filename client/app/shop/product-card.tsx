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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Rating } from "@/components/ui/rating";

interface ProductCardProps {
  pagyInfo: {
    page: number;
    size: number;
    count: number;
  };
  books: BookEntity[];
}

export const ProductCard = ({ pagyInfo, books }: ProductCardProps) => {
  const { searchParams, setSearchParams } = useSearchParamsContext();
  const router = useRouter();

  useEffect(() => {
    let params: { [key: string]: any } = searchParams;
    Object.keys(params).forEach((key) => {
      if (params[key] == null || params[key].length == 0) delete params[key];
    });

    const updatedParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      updatedParams.set(key, params[key] as string); // Add type assertion
    });
    router.push(`/shop?${updatedParams.toString()}`);
  }, [
    searchParams.page,
    searchParams.input,
    searchParams.category,
    searchParams.rating,
    searchParams.author,
  ]);
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
              onClick={() =>
                setSearchParams({ ...searchParams, page: currentPage - 1 })
              }
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setSearchParams({ ...searchParams, page: page })}
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
              onClick={() =>
                setSearchParams({ ...searchParams, page: currentPage + 1 })
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  return (
    <>
      <div className="flex justify-between px-6 mb-4">
        <div className="text-sm text-muted-foreground p-2">
          {books.length} of {pagyInfo.count} books found
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Sort by price</SelectItem>
              <SelectItem value="dark">Sort by name</SelectItem>
              <SelectItem value="system">Sort by on sale</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
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
                    <CardTitle className="text-center w-full text-xl">
                      {book.BookTitle}
                    </CardTitle>

                    <p className="text-center w-full">{book.AuthorName}</p>

                    <CardDescription className="text-center w-full">
                      {book.BookPrice}$
                    </CardDescription>
                    <div className="pb-4">
                      <Rating
                        rating={book.Rating}
                        totalStars={5}
                        size={24}
                        variant="yellow"
                        className="h-1"
                        showText={false}
                        disabled={true}
                      />
                    </div>
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
