import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GPaginationRequest {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  size: number;

  @Field(() => String, { nullable: true })
  input?: string;
}
