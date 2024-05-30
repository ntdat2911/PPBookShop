import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReviewEntity } from '../entities/review.entity';

@ObjectType()
export class GReviewPaginationResponse {
  @Field(() => Int)
  page: number;
  @Field(() => Int)
  size: number;
  @Field(() => Int)
  count: number;
  @Field(() => [ReviewEntity])
  records: ReviewEntity[];
}

@ObjectType()
export class OverviewReviewResponse {
  @Field(() => [Number])
  public countReviewList: Number[];
  @Field(() => Number)
  public averageRating: number;
  @Field(() => Number)
  public total: number;
}
