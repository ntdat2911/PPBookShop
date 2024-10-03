import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { OrderStatus, PaymentMethod } from '@prisma/client';
import { OrderItemsService } from '../order-items/order-items.service';
import { BooksService } from '../books/books.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly orderItemsService: OrderItemsService,
    private readonly booksService: BooksService,
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

  async getAllOrders(page: number, size: number, status?: string) {
    if (status) {
      return this.ordersRepository.getAllOrdersByStatus(page, size, status);
    }
    return this.ordersRepository.getAllOrders(page, size);
  }

  async countAll(status?: string) {
    return this.ordersRepository.countAll(status);
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

  async getOrdersByUserID(UserID: string) {
    return this.ordersRepository.getOrdersByUserID(UserID);
  }

  async getOrderItemsByOrderId(OrderID: string) {
    const res = await this.orderItemsService.getOrderItemsByOrderId(OrderID);
    await Promise.all(
      res.map(async (item) => {
        const book = await this.booksService.getBookById(item.BookID);
        item.ImageURL = book.ImageURL;
        item.BookTitle = book.BookTitle;
      }),
    );
    return res;
  }
}
