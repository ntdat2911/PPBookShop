"use client";

import { Rating } from "@/components/ui/rating";
import { useEffect } from "react";
import { useReviewContext } from "./reviewContext";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_OVERVIEW_REVIEW_BY_ID } from "@/services/reviews/queries";
import { GET_BOOKS } from "@/services/books/queries";
import { set } from "zod";
import Link from "next/link";

export const OverviewReviewSection = ({ BookID }: { BookID: string }) => {
  const { reviewInfo, setReviewInfo } = useReviewContext();
  const { data, refetch } = useQuery(GET_OVERVIEW_REVIEW_BY_ID, {
    variables: { id: BookID },
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (!data) return;
    setReviewInfo({
      ...reviewInfo,
      averageRating: data.getReviewOverviewById?.averageRating,
      total: data.getReviewOverviewById?.total,
      countReviewList: data.getReviewOverviewById?.countReviewList,
    });
    refetch();
  }, [data, reviewInfo.isFetching]);
  return (
    <div className="grid grid-cols-2">
      <div className="flex gap-2">
        <p>{reviewInfo?.averageRating.toFixed(2)}</p>
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
        <Link href="#review-section">
          <span className="hover:underline">{reviewInfo?.total} reviews</span>
        </Link>
      </div>
    </div>
  );
};
