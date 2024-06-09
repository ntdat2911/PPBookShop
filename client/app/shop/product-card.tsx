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
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  pagyInfo: {
    page: number;
    size: number;
    count: number;
  };
  books: BookEntity[];
}

const shows = ["6", "12", "18", "24"];
const sorts = [
  { value: "newest", label: "Newest" },
  { value: "priceLowToHigh", label: "Price low to high" },
  { value: "priceHighToLow", label: "Price high to low" },
  // { value: "sale", label: "On sale" },
  { value: "popularity", label: "Popularity" },
];

export const ProductCard = ({ pagyInfo, books }: ProductCardProps) => {
  const { searchParams, setSearchParams } = useSearchParamsContext();
  const router = useRouter();
  useEffect(() => {
    let params: { [key: string]: any } = searchParams;
    console.log(params);
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
    searchParams.size,
    searchParams.sort,
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
      <div className="flex justify-between px-6 mb-4 ">
        <div className="text-sm text-muted-foreground p-2">
          {books.length} of {pagyInfo.count} books found
        </div>
        <div className="flex gap-4">
          <Select
            defaultValue={shows[0]}
            onValueChange={(value) =>
              setSearchParams({ ...searchParams, size: parseInt(value) })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Shows" />
            </SelectTrigger>
            <SelectContent>
              {shows.map((show) => (
                <SelectItem key={show} value={show}>
                  Show {show} books
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              setSearchParams({ ...searchParams, sort: value })
            }
            defaultValue={sorts[0].value}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sorts" />
            </SelectTrigger>
            <SelectContent>
              {sorts.map((sort) => (
                <SelectItem key={sort.value} value={sort.value}>
                  {sort.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
        {books ? (
          books.map((book) => (
            <div className="flex w-full justify-center" key={book.BookID}>
              <Card className="w-5/6 justify-center p-2">
                <Link href={`/product/detail/${book.BookID}`}>
                  <CardContent className="py-0">
                    <Image
                      src={book.ImageURL}
                      alt={book.BookTitle}
                      width={300}
                      height={300}
                      className="w-[300px] h-[300px] object-contain"
                    />
                  </CardContent>
                  <CardFooter className="grid p-2 pt-0 text-dark-brown">
                    <CardTitle className="text-center w-full text-xl">
                      {book.BookTitle}
                    </CardTitle>

                    <p className="text-center w-full">{book.AuthorName}</p>
                    <div className="flex justify-center items-center w-full p-2 gap-2">
                      {book.BookPrice && book.Promotion && book.Promotion[0] ? (
                        <>
                          <div className=" text-red-500">
                            $
                            {(
                              book.BookPrice -
                              (book.BookPrice *
                                book.Promotion[0].DiscountPercent) /
                                100
                            ).toFixed(2)}
                          </div>
                          <div className=" text-gray-400 text-sm line-through">
                            ${book.BookPrice.toFixed(2)}
                          </div>
                        </>
                      ) : (
                        <p className="text-black">${book.BookPrice}</p>
                      )}
                    </div>
                    <div className="pb-4 flex justify-center gap-2">
                      <Rating
                        rating={book.Rating}
                        totalStars={5}
                        size={24}
                        variant="yellow"
                        className="h-1"
                        showText={false}
                        disabled={true}
                      />
                      <p className="text-sm">Sold {book.SoldQuantity}</p>
                    </div>
                    <div className="flex justify-center pt-2">
                      <Badge variant="outline">{book.CategoryName}</Badge>
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
