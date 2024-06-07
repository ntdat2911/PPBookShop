import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class OrderItemsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getOrderItemsByOrderId(orderId: string): Promise<any> {
    return this.prismaService.orderItem.findMany({
      where: {
        OrderID: orderId,
      },
    });
  }

  async createOrderItem(
    OrderID: string,
    BookID: string,
    Quantity: number,
    Price: number,
    Discount: number,
    Total: number,
  ) {
    return this.prismaService.orderItem.create({
      data: {
        OrderID,
        BookID,
        ItemQuantity: Quantity,
        UnitItemPrice: Price,
        TotalItemPrice: Total,
        Discount,
      },
    });
  }

  async getPopularBooks(size: number): Promise<any> {
    return this.prismaService.orderItem.groupBy({
      by: ['BookID'],
      _count: {
        BookID: true,
      },
      _sum: {
        ItemQuantity: true,
      },
      orderBy: {
        _sum: {
          ItemQuantity: 'desc',
        },
      },
      take: size,
    });
  }

  async getSoldBookByBookId(bookId: string): Promise<any> {
    return this.prismaService.orderItem.groupBy({
      by: ['BookID'],
      _count: {
        BookID: true,
      },
      _sum: {
        ItemQuantity: true,
      },
      where: {
        BookID: bookId,
      },
    });
  }
}
