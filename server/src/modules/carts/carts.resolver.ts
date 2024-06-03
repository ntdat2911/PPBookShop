import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Public } from '../auth/decorators/public.decorator';
import { CartEntity } from './entities/cart.entity';
import { CartsService } from './carts.service';
import { Prisma } from '@prisma/client';

@Resolver(() => CartEntity)
export class CartsResolver {
  constructor(private readonly cartsService: CartsService) {}

  @Public()
  @Query(() => CartEntity)
  async getCart(@Args('id') id: string) {
    return this.cartsService.getCart(id);
  }

  @Public()
  @Mutation(() => CartEntity)
  async createOrUpdateCart(
    @Args('UserID') UserID: string,
    @Args('CartDetail') CartDetail: string,
  ) {
    const cartDetail: Prisma.JsonArray = JSON.parse(CartDetail);
    return await this.cartsService.CreateOrUpdateCart(UserID, cartDetail);
  }

  @Public()
  @Mutation(() => CartEntity)
  async deleteCart(@Args('id') id: string) {
    return await this.cartsService.deleteCart(id);
  }
}
