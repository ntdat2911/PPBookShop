import { Injectable } from '@nestjs/common';
import { OrderItemsRepository } from './order-items.repository';

@Injectable()
export class OrderItemsService {
  constructor(private readonly orderItemsRepository: OrderItemsRepository) {}

  async getOrderItemsByOrderId(orderId: string): Promise<any> {
    return this.orderItemsRepository.getOrderItemsByOrderId(orderId);
  }

  async createOrderItemByString(orderId: string, orderItems: string) {
    const items = JSON.parse(orderItems);
    Object.entries(items).forEach(async ([key, item]: [string, any]) => {
      const total = item.Price * item.Quantity;
      await this.orderItemsRepository.createOrderItem(
        orderId,
        key,
        item.Quantity,
        item.Price,
        item.Discount,
        total,
      );
    });
  }

  async getPopularBooks(size: number): Promise<any> {
    const res = await this.orderItemsRepository.getPopularBooks(size);
    return res;
  }

  async getSoldBookByBookId(bookId: string): Promise<any> {
    const result = await this.orderItemsRepository.getSoldBookByBookId(bookId);

    const count = result.length > 0 ? result[0]._sum.ItemQuantity : 0;
    return count;
  }
}
