import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [PrismaModule],
  providers: [CategoriesService, CategoriesRepository, CategoriesResolver],
  exports: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
