import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrderStatus, PaymentMethod } from '@prisma/client';
import { OrderItemsService } from '../order-items/order-items.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly orderItemsService: OrderItemsService,
  ) {}

  async createOrder(data: {
    UserID: string;
    TotalPrice: number;
    Status: OrderStatus;
    AddressID: string;
    PaymentMethod: PaymentMethod;
    OrderItems: string;
  }) {
    const order = await this.ordersRepository.createOrder(data);
    await this.orderItemsService.createOrderItemByString(
      order.OrderID,
      data.OrderItems,
    );
    return order;
  }
}
