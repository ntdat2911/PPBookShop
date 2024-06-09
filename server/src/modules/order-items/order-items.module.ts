import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { PrismaModule } from 'src/database/prisma.module';
import { OrderItemsRepository } from './order-items.repository';
import { OrderItemsResolver } from './order-items.resolver';

@Module({
  imports: [PrismaModule],
  providers: [OrderItemsService, OrderItemsRepository, OrderItemsResolver],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
