import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GCreateReviewRequest {
  @Field(() => String)
  BookID: string;

  @Field(() => String)
  UserID: string;

  @Field(() => String)
  ReviewTitle: string;

  @Field(() => String)
  Comment: string;

  @Field(() => Int)
  Rating: number;
}
