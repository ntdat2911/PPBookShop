import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CartsRepository {
  constructor(private prisma: PrismaService) {}

  async getCart(UserID: string) {
    return this.prisma.cart.findUnique({
      where: {
        UserID,
      },
    });
  }

  async createCart({
    UserID,
    CartDetail,
  }: {
    UserID: string;
    CartDetail: Prisma.JsonArray;
  }) {
    return this.prisma.cart.create({
      data: {
        UserID,
        CartDetail,
      },
    });
  }

  async updateCart({
    UserID,
    CartDetail,
  }: {
    UserID: string;
    CartDetail: Prisma.JsonArray;
  }) {
    return this.prisma.cart.update({
      where: {
        UserID,
      },
      data: {
        CartDetail,
      },
    });
  }

  async deleteCart(UserID: string) {
    return this.prisma.cart.delete({
      where: {
        UserID,
      },
    });
  }
}
