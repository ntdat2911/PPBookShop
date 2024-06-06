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

  async getAllOrders(page: number, size: number) {
    return this.ordersRepository.getAllOrders(page, size);
  }

  async countAll() {
    return this.ordersRepository.countAll();
  }

  async getOrderStatus() {
    return Object.values(OrderStatus);
  }

  async updateStatus(OrderID: string, OrderStatus: OrderStatus) {
    return this.ordersRepository.updateStatus(OrderID, OrderStatus);
  }

  async getOrderByID(OrderID: string) {
    return this.ordersRepository.getOrderByID(OrderID);
  }
}
