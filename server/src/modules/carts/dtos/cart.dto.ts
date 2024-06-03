import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CartDetailType {
  @Field()
  item: string;

  @Field()
  quantity: number;
}
