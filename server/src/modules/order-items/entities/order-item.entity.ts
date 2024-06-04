import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "OrderItemID")')
export class OrderItemEntity {
  @Field(() => String)
  OrderItemID: string;

  @Field(() => String)
  OrderID: string;

  @Field(() => String)
  BookID: string;

  @Field(() => Number)
  ItemQuantity: number;

  @Field(() => Number)
  UnitItemPrice: number;

  @Field(() => Number)
  TotalItemPrice: number;

  @Field(() => Number)
  Discount: number;
}
