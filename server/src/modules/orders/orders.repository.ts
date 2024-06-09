import { Injectable } from '@nestjs/common';
import { OrderStatus, PaymentMethod } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(data: {
    UserID: string;
    TotalPrice: number;
    Status: OrderStatus;
    AddressID: string;
    PaymentMethod: PaymentMethod;
  }) {
    return this.prismaService.order.create({
      data: {
        UserID: data.UserID,
        TotalPrice: data.TotalPrice,
        Status: data.Status,
        AddressID: data.AddressID,
        PaymentMethod: data.PaymentMethod,
      },
    });
  }

  async getAllOrders(page: number, size: number) {
    return this.prismaService.order.findMany({
      take: size,
      skip: (page - 1) * size,
      orderBy: {
        CreatedAt: 'desc',
      },
    });
  }

  async countAll() {
    return this.prismaService.order.count();
  }

  async updateStatus(OrderID: string, OrderStatus: OrderStatus) {
    return this.prismaService.order.update({
      where: {
        OrderID,
      },
      data: {
        Status: OrderStatus,
      },
    });
  }

  async getOrderByID(OrderID: string) {
    return this.prismaService.order.findUnique({
      where: {
        OrderID,
      },
    });
  }

  async getOrdersByUserID(UserID: string) {
    return this.prismaService.order.findMany({
      where: {
        UserID: UserID,
      },
    });
  }
}
