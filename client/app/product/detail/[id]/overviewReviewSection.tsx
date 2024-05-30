"use client";

import { Rating } from "@/components/ui/rating";
import { useEffect } from "react";
import { useReviewContext } from "./reviewContext";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_OVERVIEW_REVIEW_BY_ID } from "@/services/reviews/queries";
import { GET_BOOKS } from "@/services/books/queries";
import { set } from "zod";

export const OverviewReviewSection = ({ BookID }: { BookID: string }) => {
  const { reviewInfo, setReviewInfo } = useReviewContext();
  const { data } = useQuery(GET_OVERVIEW_REVIEW_BY_ID, {
    variables: { id: BookID },
  });
  useEffect(() => {
    setReviewInfo(data?.getReviewOverviewById);
  }, [data]);
  return (
    <div className="grid grid-cols-2">
      <div className="flex gap-2">
        <p>{reviewInfo?.averageRating}</p>
        <Rating
          rating={reviewInfo?.averageRating || 0}
          totalStars={5}
          size={24}
          variant="yellow"
          className="h-1"
          showText={false}
          disabled={true}
        />
      </div>

      <div className="flex gap-2">
        <span>{reviewInfo?.total} reviews</span>
      </div>
    </div>
  );
};
