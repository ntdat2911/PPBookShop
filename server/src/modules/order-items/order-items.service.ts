import { Injectable } from '@nestjs/common';
import { OrderItemsRepository } from './order-items.repository';

@Injectable()
export class OrderItemsService {
  constructor(private readonly orderItemsRepository: OrderItemsRepository) {}

  async getOrderItemsByOrderId(orderId: string): Promise<any> {
    return this.orderItemsRepository.getOrderItemsByOrderId(orderId);
  }

  async createOrderItemByString(orderId: string, orderItems: string) {
    console.log(orderItems);
    const items = JSON.parse(orderItems);
    Object.entries(items).forEach(async ([key, item]: [string, any]) => {
      const total = item.Quantity * item.Price;
      await this.orderItemsRepository.createOrderItem(
        orderId,
        key,
        item.Quantity,
        item.Price,
        total,
      );
    });
  }
}
