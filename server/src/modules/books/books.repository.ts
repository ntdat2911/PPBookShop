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

  async create(formData: {
    BookTitle: string;
    AuthorBy: string;
    BookPrice: number;
    ImageURL: string;
    IsBookActive: boolean;
    IsOutOfStock: boolean;
    BookDescription: string;
    CategoryID: string;
    PublishDate: Date;
  }): Promise<BookEntity> {
    return this.prisma.book.create({
      data: {
        BookTitle: formData.BookTitle,
        AuthorBy: formData.AuthorBy,
        BookPrice: formData.BookPrice,
        ImageURL: formData.ImageURL,
        BookDescription: formData.BookDescription,
        CategoryID: formData.CategoryID,
        PublishDate: formData.PublishDate,
        Rating: 0,
        IsBookActive: formData.IsBookActive,
        IsOutOfStock: formData.IsOutOfStock,
      },
    });
  }

  async updateActiveStatus(BookID: string, IsBookActive: boolean) {
    return this.prisma.book.update({
      where: {
        BookID: BookID,
      },
      data: {
        IsBookActive: IsBookActive,
      },
    });
  }

  async getBookById(BookID: string) {
    return this.prisma.book.findUnique({
      where: {
        BookID: BookID,
      },
    });
  }

  async updateBook(formData: {
    BookID: string;
    BookTitle: string;
    AuthorBy: string;
    BookPrice: number;
    ImageURL: string;
    IsBookActive: boolean;
    IsOutOfStock: boolean;
    BookDescription: string;
    CategoryID: string;
    PublishDate: Date;
  }) {
    return this.prisma.book.update({
      where: {
        BookID: formData.BookID,
      },
      data: {
        BookTitle: formData.BookTitle,
        AuthorBy: formData.AuthorBy,
        BookPrice: formData.BookPrice,
        ImageURL: formData.ImageURL,
        BookDescription: formData.BookDescription,
        CategoryID: formData.CategoryID,
        PublishDate: formData.PublishDate,
        IsBookActive: formData.IsBookActive,
        IsOutOfStock: formData.IsOutOfStock,
      },
    });
  }

  async countAll() {
    return this.prisma.book.count();
  }
}
