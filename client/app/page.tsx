import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getOnSaleBooks,
  getPopularBooks,
  getRecommendedBooks,
} from "@/services/books/services";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookEntity } from "@/codegen/__generated__/graphql";
import Link from "next/link";
import { Rating } from "@/components/ui/rating";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const [onSalebooks, recommendedBooks, popularBooks] = await Promise.all([
    await getOnSaleBooks(15),
    await getRecommendedBooks(15),
    await getPopularBooks(15),
  ]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-12 space-y-16">
      <Card className="w-full text-dark-brown ">
        <CardHeader>
          <div className="grid grid-cols-3 ">
            <Label className="text-4xl col-start-2 justify-self-center">
              On Sale
            </Label>
            <Link href="/shop?page=1" className="col-start-3 justify-self-end">
              <Button variant="ghost" className="text-lg hover:bg-gray-200 ">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-6" key="OnSale">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {onSalebooks && onSalebooks.length > 0 ? (
                onSalebooks.map((book: BookEntity) => (
                  <CarouselItem
                    key={"SALE" + book.BookID}
                    className="md:basis-1/2 lg:basis-1/5"
                  >
                    <div className="p-1 h-full">
                      <Link
                        href={`/product/detail/${book.BookID}`}
                        className="group h-full"
                      >
                        <Card>
                          <CardContent className="p-0 flex aspect-square items-center justify-center">
                            <Image
                              src={book.ImageURL}
                              alt={book.BookTitle}
                              width={300}
                              height={300}
                              className="w-[300px] h-[300px] object-contain"
                            />
                          </CardContent>
                          <CardFooter className="group-hover:bg-gray-200">
                            <div className="flex flex-col items-center w-full p-2 gap-2">
                              <div className="overflow-hidden overflow-ellipsis w-full h-16 text-center">
                                <CardTitle className="text-2xl">
                                  {book.BookTitle}
                                </CardTitle>
                              </div>
                              <p>{book.AuthorName}</p>

                              <div className="flex gap-2 text-xl">
                                {book.BookPrice &&
                                book.Promotion &&
                                book.Promotion[0] &&
                                book.Promotion[0].DiscountPercent ? (
                                  <>
                                    <div className="text-red-500 text-lg">
                                      $
                                      {(
                                        book.BookPrice -
                                        (book.BookPrice *
                                          book.Promotion[0].DiscountPercent) /
                                          100
                                      ).toFixed(2)}
                                    </div>
                                    <div className=" line-through text-gray-500">
                                      ${book.BookPrice.toFixed(2)}
                                    </div>
                                  </>
                                ) : (
                                  <p className="text-black">
                                    ${book.BookPrice.toFixed(2)}
                                  </p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Rating
                                  rating={book.Rating}
                                  totalStars={5}
                                  size={24}
                                  variant="yellow"
                                  className="h-1"
                                  showText={false}
                                  disabled={true}
                                />

                                <p className="text-sm text-end">
                                  Sold {book.SoldQuantity}
                                </p>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <div className="flex justify-center items-center w-full h-96">
                  <p className="text-2xl">No books on sale</p>
                </div>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>
      <Tabs
        defaultValue="recommended"
        className="w-full items-center flex flex-col"
      >
        <TabsList>
          <TabsTrigger value="recommended" className="text-xl">
            Recommended
          </TabsTrigger>
          <TabsTrigger value="popular" className="text-xl">
            Popular
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recommended" className="w-full">
          <Card className="w-full p-6">
            <CardContent
              className="w-full grid grid-cols-5 gap-4 p-0 "
              key="Recommended"
            >
              {recommendedBooks.map((book: BookEntity) => (
                <div className="p-1" key={"Recommended" + book.BookID}>
                  <Link
                    href={`/product/detail/${book.BookID}`}
                    className="group"
                  >
                    <Card>
                      <CardContent className="p-0 flex aspect-square items-center justify-center ">
                        <Image
                          src={book.ImageURL}
                          alt={book.BookTitle}
                          width={300}
                          height={300}
                          className="w-[300px] h-[300px] object-contain"
                        />
                      </CardContent>
                      <CardFooter className="group-hover:bg-gray-200 text-dark-brown">
                        <div className="flex flex-col items-center w-full p-2 gap-2">
                          <div className="overflow-hidden overflow-ellipsis w-full h-16 text-center">
                            <CardTitle className="text-2xl">
                              {book.BookTitle}
                            </CardTitle>
                          </div>
                          <p>{book.AuthorName}</p>

                          <div className="flex gap-2">
                            {book.BookPrice &&
                            book.Promotion &&
                            book.Promotion[0] &&
                            book.Promotion[0].DiscountPercent ? (
                              <>
                                <div className="text-red-500 text-lg">
                                  $
                                  {(
                                    book.BookPrice -
                                    (book.BookPrice *
                                      book.Promotion[0].DiscountPercent) /
                                      100
                                  ).toFixed(2)}
                                </div>
                                <div className=" line-through text-gray-500">
                                  ${book.BookPrice.toFixed(2)}
                                </div>
                              </>
                            ) : (
                              <p className=" text-black">${book.BookPrice}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Rating
                              rating={book.Rating}
                              totalStars={5}
                              size={24}
                              variant="yellow"
                              className="h-1"
                              showText={false}
                              disabled={true}
                            />

                            <p className="text-sm text-end">
                              Sold {book.SoldQuantity}
                            </p>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="popular" className="w-full">
          <Card className="w-full p-6">
            <CardContent className="w-full grid grid-cols-5 gap-4 p-0">
              {popularBooks.map((book: BookEntity) => (
                <div className="p-1" key={"Popular" + book.BookID}>
                  <Link
                    href={`/product/detail/${book.BookID}`}
                    className="group"
                  >
                    <Card>
                      <CardContent
                        className="p-0 flex aspect-square items-center justify-center"
                        key="Popular"
                      >
                        <Image
                          src={book.ImageURL}
                          alt={book.BookTitle}
                          width={300}
                          height={300}
                          className="w-[300px] h-[300px] object-contain"
                        />
                      </CardContent>
                      <CardFooter className="group-hover:bg-gray-200">
                        <div className="flex flex-col items-center w-full p-2 gap-2">
                          <div className="overflow-hidden overflow-ellipsis w-full h-16 text-center">
                            <CardTitle className="text-2xl">
                              {book.BookTitle}
                            </CardTitle>
                          </div>
                          <p>{book.AuthorName}</p>

                          <div className="flex gap-2">
                            {book.BookPrice &&
                            book.Promotion &&
                            book.Promotion[0] &&
                            book.Promotion[0].DiscountPercent ? (
                              <>
                                <div className="text-red-500 text-lg">
                                  $
                                  {(
                                    book.BookPrice -
                                    (book.BookPrice *
                                      book.Promotion[0].DiscountPercent) /
                                      100
                                  ).toFixed(2)}
                                </div>
                                <div className=" line-through text-gray-500 ">
                                  ${book.BookPrice.toFixed(2)}
                                </div>
                              </>
                            ) : (
                              <p className="text-black">${book.BookPrice}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Rating
                              rating={book.Rating}
                              totalStars={5}
                              size={24}
                              variant="yellow"
                              className="h-1"
                              showText={false}
                              disabled={true}
                            />

                            <p className="text-sm text-end">
                              Sold {book.SoldQuantity}
                            </p>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
