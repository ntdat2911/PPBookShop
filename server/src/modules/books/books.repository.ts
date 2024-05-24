import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BooksRepository {
  constructor(private prisma: PrismaService) {}

  async findByFilter(params: {
    page: number;
    size: number;
    input: string;
  }): Promise<BookEntity[]> {
    return this.prisma.book.findMany({
      skip: (params.page - 1) * params.size,
      take: params.size,
      where: {
        BookTitle: {
          contains: params.input,
        },
      },
    });
  }
  //count by condition
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
}
