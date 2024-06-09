import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { BooksModule } from '../books/books.module';
import { AuthorsModule } from '../authors/authors.module';
import { CategoriesModule } from '../categories/categories.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { PromotionsModule } from '../promotions/promotions.module';
import { OrdersModule } from '../orders/orders.module';
import { AddressesModule } from '../addresses/addresses.module';
import { OrderItemsModule } from '../order-items/order-items.module';
import { AboutUsModule } from '../about-us/about-us.module';
import { PrismaModule } from 'src/database/prisma.module';
import { AdminRepository } from './admin.repository';
import { AuthMiddleware } from '../auth/middleware/middleware';

@Module({
  imports: [
    BooksModule,
    AuthorsModule,
    CategoriesModule,
    ReviewsModule,
    PromotionsModule,
    OrdersModule,
    AddressesModule,
    OrderItemsModule,
    AboutUsModule,
    PrismaModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
  exports: [AdminService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'admin/*',
      method: RequestMethod.ALL,
    });
  }
}
