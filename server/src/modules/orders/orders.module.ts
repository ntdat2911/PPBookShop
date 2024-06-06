import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PrismaModule } from 'src/database/prisma.module';
import { OrdersRepository } from './orders.repository';
import { OrdersResolver } from './orders.resolver';
import { OrderItemsModule } from '../order-items/order-items.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [PrismaModule, OrderItemsModule],
  providers: [OrdersService, OrdersRepository, OrdersResolver],
  exports: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
