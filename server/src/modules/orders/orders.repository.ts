import { Injectable } from '@nestjs/common';
import { OrderStatus, PaymentMethod } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

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
}
