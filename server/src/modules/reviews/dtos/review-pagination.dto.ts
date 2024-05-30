import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GReviewPaginationRequest {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  size: number;

  @Field(() => String)
  bookID: string;

  @Field(() => Int, { nullable: true })
  rating?: number;
}
