import { Field, ObjectType } from '@nestjs/graphql';
import { OrderItemEntity } from '../entities/order-item.entity';
@ObjectType()
export class IOrderItemResponse extends OrderItemEntity {
  @Field(() => String)
  ImageURL: string;

  @Field(() => String)
  BookTitle: string;
}
