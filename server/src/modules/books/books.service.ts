import { Injectable, Logger } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { CommonService } from '../common/common.service';
import { PrismaService } from 'src/database/prisma.service';
import { GPaginationRequest } from './dtos/pagination.dto';
import { BookEntity } from './entities/book.entity';
import { GPaginatedBookResponse } from './interfaces/books-response.interface';

@Injectable()
export class BooksService {
  constructor(
    private booksRepository: BooksRepository,
    private readonly prismaService: PrismaService,
  ) {}

  public async getBooks(
    params: GPaginationRequest,
  ): Promise<GPaginatedBookResponse> {
    const { page, size, input } = params;

    const books = await this.booksRepository.findByFilter({
      page: page,
      size: size,
      input: input,
    });
    const count = await this.booksRepository.count({
      input: input,
    });
    const result: GPaginatedBookResponse = {
      page: page,
      size: size,
      count: count,
      records: books,
    };
    return result;
  }

  public async getAllBooks(page: number, size: number): Promise<BookEntity[]> {
    const res = await this.booksRepository.findAll(page, size);
    return res;
  }
}
