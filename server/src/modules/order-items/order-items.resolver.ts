import { Args, Query, Resolver } from '@nestjs/graphql';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrderItemsService } from './order-items.service';

@Resolver(() => OrderItemEntity)
export class OrderItemsResolver {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Query(() => [OrderItemEntity])
  async getOrderItemsByOrderId(
    @Args('orderId') orderId: string,
  ): Promise<OrderItemEntity[]> {
    return this.orderItemsService.getOrderItemsByOrderId(orderId);
  }
}
