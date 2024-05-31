"use client";
import { Progress } from "@/components/ui/progress";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useReviewContext } from "./reviewContext";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLazyQuery } from "@apollo/client";
import { GET_REVIEW_BY_BOOK_ID } from "@/services/reviews/queries";
import { ReviewEntity } from "@/codegen/__generated__/graphql";
import { format, formatDistanceToNow } from "date-fns";
export default function ReviewDisplay({ bookID }: { bookID: string }) {
  const { reviewInfo, setReviewInfo } = useReviewContext();
  const [getReview, { data: reviewData }] = useLazyQuery(
    GET_REVIEW_BY_BOOK_ID,
    {
      fetchPolicy: "network-only",
    }
  );
  useEffect(() => {
    getReview({
      variables: {
        bookID: bookID,
        rating: reviewInfo.selected + 1,
        page: 1,
        size: 100,
      },
    });
  }, [reviewInfo.selected, reviewInfo.isFetching]);

  return (
    <div className="h-full">
      <form className="grid w-full h-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4 h-full">
          <legend className="-ml-1 px-1 text-sm font-medium">Reviews</legend>
          <div className="grid grid-cols-3 grid-rows-1">
            <div className="flex flex-col flex-col-reverse pr-4 justify-center">
              {reviewInfo &&
                reviewInfo.countReviewList.map((count: any, index: any) => (
                  <div
                    key={`review-${index}`}
                    className={cn(
                      "flex gap-2 items-center justify-start hover:bg-gray-200 rounded-lg p-2 cursor-pointer",
                      reviewInfo.selected === index ? "bg-gray-200" : ""
                    )}
                    onClick={() =>
                      setReviewInfo({ ...reviewInfo, selected: index })
                    }
                  >
                    <p>{index + 1}</p>
                    <StarFilledIcon className="w-6 h-6 text-yellow-400" />
                    <Progress value={(count / reviewInfo.total) * 100} />
                    <p>{count}</p>
                  </div>
                ))}
              <div className="flex w-full justify-center">
                <h1 className="text-2xl font-bold">
                  {reviewInfo?.averageRating.toFixed(2) || 0}
                </h1>
              </div>
            </div>

            <div className="col-span-2 pl-4 border-l-2">
              <ScrollArea className="h-96 pr-4">
                {reviewData &&
                reviewData.getReviewsByBookId.records.length > 0 ? (
                  reviewData.getReviewsByBookId.records.map((review, index) => (
                    <div key={review.ReviewID}>
                      <div className="flex flex-col text-sm my-2">
                        <div className="flex gap-4 items-center justify-between">
                          <div className="flex gap-2 items-center">
                            <p className="font-bold">{review.Username}</p>
                          </div>
                          <div>
                            <p className="text-xs">
                              {formatDistanceToNow(new Date(review.CreatedAt))}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-bold">{review.ReviewTitle}</p>

                          <p>{review.Comment}</p>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center h-96">
                    <p>No reviews</p>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
