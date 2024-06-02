"use client";
import { OverviewReviewResponse } from "@/codegen/__generated__/graphql";
import { createContext, useContext, useState } from "react";

const ReviewContext = createContext<any>(undefined);

interface ReviewContextProps extends OverviewReviewResponse {
  countReviewList: number[];
  averageRating: number;
  total: number;
  selected: number;
  isFetching: boolean;
}

export function ReviewContexttWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  let [reviewInfo, setReviewInfo] = useState<ReviewContextProps>({
    countReviewList: [],
    averageRating: 0,
    total: 0,
    selected: 3,
    isFetching: false,
  });
  return (
    <ReviewContext.Provider value={{ reviewInfo, setReviewInfo }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviewContext() {
  return useContext(ReviewContext);
}
