import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { PrismaModule } from 'src/database/prisma.module';
import { BooksResolver } from './books.resolver';
import { BooksRepository } from './books.repository';
import { AuthorsModule } from '../authors/authors.module';
import { BooksController } from './books.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, AuthorsModule, CloudinaryModule],
  providers: [BooksService, BooksResolver, BooksRepository],
  exports: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
