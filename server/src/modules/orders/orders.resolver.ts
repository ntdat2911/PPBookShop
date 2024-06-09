import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderEntity } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { OrderStatus, PaymentMethod } from '@prisma/client';
import { CreateOrderInput } from './interfaces/order.interface';
import { Public } from '../auth/decorators/public.decorator';

@Resolver(() => OrderEntity)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

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
}
