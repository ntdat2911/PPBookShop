import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { OrderEntity } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { OrderStatus, PaymentMethod } from '@prisma/client';
import { CreateOrderInput } from './interfaces/order.interface';
import { Public } from '../auth/decorators/public.decorator';
import { OrderItemsService } from '../order-items/order-items.service';
import { OrderItemEntity } from '../order-items/entities/order-item.entity';
import { IOrderItemResponse } from '../order-items/interfaces/order-item-response.interface';

@Resolver(() => OrderEntity)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly orderItemsService: OrderItemsService,
  ) {}

  @Public()
  @Mutation(() => OrderEntity)
  async createOrder(@Args('data') data: CreateOrderInput) {
    return this.ordersService.createOrder({
      ...data,
      Status: data.Status as OrderStatus,
      PaymentMethod: data.PaymentMethod as PaymentMethod,
      OrderItems: data.OrderItems,
    });
  }

  @Public()
  @Query(() => [OrderEntity])
  async getOrdersByUserID(@Args('userID') userID: string) {
    return this.ordersService.getOrdersByUserID(userID);
  }

  @ResolveField(() => [IOrderItemResponse])
  async OrderItems(@Parent() order: OrderEntity) {
    return await this.ordersService.getOrderItemsByOrderId(order.OrderID);
  }
}
