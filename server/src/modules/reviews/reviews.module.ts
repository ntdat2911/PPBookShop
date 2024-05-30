import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewRepository } from './reviews.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { ReviewsResolver } from './reviews.resolver';
import { UsersModule } from '../users/users.module';
import { BooksModule } from '../books/books.module';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [PrismaModule, UsersModule, BooksModule],
  providers: [ReviewsService, ReviewRepository, ReviewsResolver],
  exports: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
