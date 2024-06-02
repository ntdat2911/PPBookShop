import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { BooksModule } from '../books/books.module';
import { AuthorsModule } from '../authors/authors.module';
import { CategoriesModule } from '../categories/categories.module';
import { ReviewsModule } from '../reviews/reviews.module';

@Module({
  imports: [BooksModule, AuthorsModule, CategoriesModule, ReviewsModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
