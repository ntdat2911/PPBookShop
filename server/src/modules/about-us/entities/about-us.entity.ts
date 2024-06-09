import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AboutUsEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  content: string;
}
