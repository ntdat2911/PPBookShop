import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GPaginationRequest {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  size: number;

  @Field(() => String, { nullable: true })
  input?: string;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => String, { nullable: true })
  author?: string;

  @Field(() => String, { nullable: true })
  rating?: string;
}
