import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  UserID: string;

  @Field(() => Number)
  TotalPrice: number;

  @Field(() => String)
  Status: string;

  @Field(() => String)
  AddressID: string;

  @Field(() => String)
  PaymentMethod: string;

  @Field(() => String)
  OrderItems: string;
}
