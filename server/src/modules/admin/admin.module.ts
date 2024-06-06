import { Module } from '@nestjs/common';
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
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
