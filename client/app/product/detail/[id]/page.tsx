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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ReviewContexttWrapper } from "./reviewContext";
import { Minus, Plus } from "lucide-react";
import { OverviewReviewSection } from "./overviewReviewSection";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAuthorById } from "@/services/authors/services";
import ReviewSection from "./reviewSection";
import ReviewDisplay from "./reviewDisplay";

export default async function Page({ params }: { params: { id: string } }) {
  const book: BookEntity = await getBookById(params.id);
  const author = await getAuthorById(book.AuthorBy);
  return (
    <ReviewContexttWrapper>
      <div className="container py-4 flex flex-col space-y-8">
        <div className="flex">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/shop">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">
                  {book.CategoryName}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{book.BookTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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
              <div className="DESCRIPTION grid">
                <Label className="font-bold">Description:</Label>
                <div className="text-md">{book.BookDescription}</div>
              </div>
              <div className="DISCOUNT flex flex-col gap-2">
                <Label className="font-bold">Discount:</Label>
                <div className="flex gap-4">
                  <Badge variant="outline">50% Sale</Badge>
                </div>
              </div>
              <div className="PRICE ">
                <div className="text-2xl font-semibold line-through">
                  ${100}
                </div>

                <div className="text-4xl font-bold text-red-500">
                  ${book.BookPrice}
                </div>
              </div>
              <div className="QUANTITY ">
                <Label>Quantity</Label>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <Minus className="w-6 h-6" />
                  </Button>
                  <Button size="icon" variant="outline">
                    2
                  </Button>
                  <Button size="icon" variant="outline">
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>
              </div>
              <div className="ACTION grid grid-cols-2 gap-2 ">
                <Button>Add to cart</Button>
                <Button variant="outline">Checkout</Button>
              </div>
            </div>
          </div>
        </Card>
        <Card className="h-max">
          <Tabs defaultValue="author" className="w-full">
            <TabsList>
              <TabsTrigger value="author">About author</TabsTrigger>
              <TabsTrigger value="review">Reviews</TabsTrigger>
            </TabsList>
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

                  <ReviewSection />
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </ReviewContexttWrapper>
  );
}
