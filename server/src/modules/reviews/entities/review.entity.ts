import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "ReviewID")')
export class ReviewEntity {
  @Field(() => String)
  ReviewID: string;

  @Field(() => String)
  BookID: string;

  @Field(() => String)
  UserID: string;

  @Field(() => String)
  ReviewTitle: string;

  @Field(() => Number)
  Rating: number;

  @Field(() => String)
  Comment: string;

  @Field(() => Date)
  CreatedAt: Date;
}
