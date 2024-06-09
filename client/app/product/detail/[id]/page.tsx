import { BookEntity } from "@/codegen/__generated__/graphql";
import { getBookById } from "@/services/books/services";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { ReviewContexttWrapper } from "./reviewContext";
import { Minus, Plus } from "lucide-react";
import { OverviewReviewSection } from "./overviewReviewSection";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAuthorById } from "@/services/authors/services";
import ReviewSection from "./reviewSection";
import ReviewDisplay from "./reviewDisplay";
import { useSession } from "next-auth/react";
import { BreadcrumbComponents } from "./breadcrumb";
import { CartSection } from "./cartSection";
import { cn } from "@/lib/utils";

export default async function Page({ params }: { params: { id: string } }) {
  const book: BookEntity = await getBookById(params.id);
  const author = await getAuthorById(book.AuthorBy);
  return (
    <ReviewContexttWrapper>
      <div className="container py-4 flex flex-col space-y-8">
        <div className="flex">
          <BreadcrumbComponents book={book} />
        </div>
        <Card className="">
          <div className="grid grid-cols-2 grid-rows-1 p-4 h-[70vh]">
            <div className="w-full h-full flex justify-center">
              <Image
                src={book.ImageURL}
                width={400}
                height={400}
                alt={book.BookTitle}
                className="h-full object-contain"
              />
            </div>
            <div className="flex flex-col space-y-4 justify-center">
              <div className="TITLE">
                <h2 className="text-2xl font-bold">{book.BookTitle}</h2>
                <p>{book.AuthorName}</p>
              </div>
              <div className="FEEDBACK">
                <OverviewReviewSection BookID={book.BookID} />
              </div>

              <div className="DISCOUNT flex gap-2">
                {book.Promotion &&
                  book.Promotion?.map((promotion) => (
                    <div key={promotion.PromotionID} className="flex gap-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          book.Promotion &&
                            book.Promotion[0] &&
                            promotion.PromotionID ==
                              book.Promotion[0].PromotionID
                            ? "border-2 border-green-500"
                            : "bg-gray-200"
                        )}
                      >
                        {promotion.DiscountPercent}% - {promotion.PromotionName}
                      </Badge>
                    </div>
                  ))}
              </div>
              <div className="PRICE ">
                <div className="">
                  {book.BookPrice && book.Promotion && book.Promotion[0] ? (
                    <>
                      <div className="text-2xl font-semibold line-through">
                        ${book.BookPrice.toFixed(2)}
                      </div>
                      <div className="text-4xl font-bold text-red-500">
                        $
                        {(
                          book.BookPrice -
                          (book.BookPrice * book.Promotion[0].DiscountPercent) /
                            100
                        ).toFixed(2)}
                      </div>
                    </>
                  ) : (
                    <p className="text-4xl font-bold text-black">
                      ${book.BookPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
              <CartSection book={book} />
            </div>
          </div>
        </Card>
        <Card className="h-max" id="review-section">
          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Book Description</TabsTrigger>
              <TabsTrigger value="author">About author</TabsTrigger>

              <TabsTrigger value="review">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <CardContent>
                <CardDescription>{book.BookDescription}</CardDescription>
              </CardContent>
            </TabsContent>
            <TabsContent value="author">
              <CardHeader>
                <CardTitle>{author.AuthorName}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{author.Bio}</CardDescription>
              </CardContent>
            </TabsContent>
            <TabsContent value="review">
              <CardContent>
                <div className="grid grid-cols-3 grid-rows-1 gap-4">
                  <div className="col-span-2">
                    <ReviewDisplay bookID={book.BookID} />
                  </div>

                  <ReviewSection bookID={book.BookID} />
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </ReviewContexttWrapper>
  );
}
