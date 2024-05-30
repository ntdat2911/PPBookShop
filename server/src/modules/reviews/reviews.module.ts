import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewRepository } from './reviews.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { ReviewsResolver } from './reviews.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ReviewsService, ReviewRepository, ReviewsResolver],
  exports: [ReviewsService],
})
export class ReviewsModule {}
