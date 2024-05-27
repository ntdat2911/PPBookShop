import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { BookEntity } from './entities/book.entity';
import { OverviewDetailBook } from './interfaces/books-response.interface';

@Injectable()
export class BooksRepository {
  constructor(private prisma: PrismaService) {}

  async findByFilter(params: {
    page: number;
    size: number;
    input: string;
  }): Promise<OverviewDetailBook[]> {
    return this.prisma.book.findMany({
      skip: (params.page - 1) * params.size,
      take: params.size,
      select: {
        BookTitle: true,
        AuthorBy: true,
        BookID: true,
        BookPrice: true,
        ImageURL: true,
      },
      where: {
        BookTitle: {
          contains: params.input,
        },
        IsBookActive: true,
        IsOutOfStock: false,
      },
    });
  }
  async count(params: { input }) {
    const result = await this.prisma.book.count({
      where: {
        BookTitle: {
          contains: params.input,
        },
      },
    });
    return result;
  }

  async findAll(page: number, size: number): Promise<BookEntity[]> {
    return this.prisma.book.findMany({
      skip: (page - 1) * size,
      take: size,
      //sort by CreatedAt
      orderBy: {
        CreatedAt: 'desc',
      },
    });
  }
}
