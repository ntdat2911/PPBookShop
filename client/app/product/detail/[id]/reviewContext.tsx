"use client";
import { OverviewReviewResponse } from "@/codegen/__generated__/graphql";
import { createContext, useContext, useState } from "react";

const ReviewContext = createContext<any>(undefined);

export function ReviewContexttWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  let [reviewInfo, setReviewInfo] = useState<OverviewReviewResponse>({
    countReviewList: [],
    averageRating: 0,
    total: 0,
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
