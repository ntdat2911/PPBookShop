import {
  Directive,
  Field,
  GraphQLISODateTime,
  ObjectType,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { CartDetailType } from '../dtos/cart.dto';

@ObjectType()
@Directive('@key(fields: "CartID")')
export class CartEntity {
  @Field(() => String)
  CartID: string;

  @Field(() => String)
  UserID: string;

  @Field(() => String)
  CartDetail: string;

  @Field(() => GraphQLISODateTime)
  CreatedAt: Date;
}
