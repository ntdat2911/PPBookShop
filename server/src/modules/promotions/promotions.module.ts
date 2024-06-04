import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { PromotionsRepository } from './promotions.repository';
import { PromotionsResolver } from './promotions.resolver';

@Module({
  imports: [PrismaModule],
  providers: [PromotionsService, PromotionsRepository, PromotionsResolver],
  exports: [PromotionsService],
  controllers: [PromotionsController],
})
export class PromotionsModule {}
