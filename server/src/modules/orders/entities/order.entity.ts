import {
  Directive,
  Field,
  GraphQLISODateTime,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "OrderID")')
export class OrderEntity {
  @Field(() => String)
  OrderID: string;

  @Field(() => String)
  UserID: string;

  @Field(() => Number)
  TotalPrice: number;

  @Field(() => String)
  AddressID: string;

  @Field(() => String)
  Status: string;

  @Field(() => String)
  PaymentMethod: string;

  @Field(() => GraphQLISODateTime)
  CreatedAt: Date;
}
