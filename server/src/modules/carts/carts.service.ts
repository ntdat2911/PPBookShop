import { Injectable } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class CartsService {
  constructor(private readonly cartsRepository: CartsRepository) {}

  async getCart(UserID: string) {
    const cart = await this.cartsRepository.getCart(UserID);
    cart.CartDetail = JSON.stringify(cart.CartDetail);
    return cart;
  }

  async updateCart(UserID: string, cartDetail: Prisma.JsonArray) {
    const result = await this.cartsRepository.updateCart({
      UserID,
      CartDetail: cartDetail,
    });

    result.CartDetail = JSON.stringify(result.CartDetail);
    return result;
  }

  async deleteCart(UserID: string) {
    const result = await this.cartsRepository.deleteCart(UserID);
    result.CartDetail = JSON.stringify(result.CartDetail);
    return result;
  }

  async createCart(UserID: string, CartDetail: Prisma.JsonArray) {
    const result = await this.cartsRepository.createCart({
      UserID,
      CartDetail,
    });
    result.CartDetail = JSON.stringify(result.CartDetail);
    return result;
  }

  async CreateOrUpdateCart(UserID: string, CartDetail: Prisma.JsonArray) {
    const cart = await this.cartsRepository.getCart(UserID);
    if (cart) {
      return this.updateCart(UserID, CartDetail);
    }
    return this.createCart(UserID, CartDetail);
  }
}
