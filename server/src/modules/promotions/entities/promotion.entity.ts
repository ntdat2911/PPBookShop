import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PromotionEntity {
  @Field(() => String)
  public PromotionID: string;

  @Field(() => String)
  public PromotionName: string;

  @Field(() => Number, { nullable: true })
  public DiscountPercent?: number;

  @Field(() => GraphQLISODateTime)
  public ExpiredDate: Date;

  @Field(() => Boolean)
  public IsAvailable: boolean;

  @Field(() => GraphQLISODateTime)
  public CreatedAt: Date;

  @Field(() => GraphQLISODateTime)
  public UpdatedAt: Date;
}
