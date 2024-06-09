import { Resolver } from '@nestjs/graphql';
import { PromotionEntity } from './entities/promotion.entity';
import e from 'express';
import { PromotionsService } from './promotions.service';

@Resolver(() => PromotionEntity)
export class PromotionsResolver {
  constructor(private readonly promotionsService: PromotionsService) {}
}
