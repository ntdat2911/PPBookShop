import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { PrismaModule } from 'src/database/prisma.module';
import { BooksResolver } from './books.resolver';
import { BooksRepository } from './books.repository';

@Module({
  imports: [PrismaModule],
  providers: [BooksService, BooksResolver, BooksRepository],
  exports: [BooksService],
})
export class BooksModule {}
