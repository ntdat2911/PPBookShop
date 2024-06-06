import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { BookEntity } from './entities/book.entity';
import { OverviewDetailBook } from './interfaces/books-response.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksRepository {
  constructor(private prisma: PrismaService) {}

  async findByFilter(params: {
    page: number;
    size: number;
    input: string;
    category: string[];
    ratingRanges: { min: number; max: number }[];
    author: string[];
    sort: string;
  }): Promise<{ data: OverviewDetailBook[]; total: number }> {
    const whereClause: Prisma.BookWhereInput = {
      BookTitle: {
        contains: params.input,
        mode: 'insensitive',
      },
      IsBookActive: true,
      IsOutOfStock: false,
    };

    if (params.author && params.author.length > 0) {
      whereClause.AuthorBy = {
        in: params.author,
      };
    }

    if (params.category && params.category.length > 0) {
      whereClause.CategoryID = {
        in: params.category,
      };
    }

    if (params.ratingRanges && params.ratingRanges.length > 0) {
      whereClause.OR = params.ratingRanges.map((range) => ({
        Rating: {
          gte: range.min,
          lte: range.max,
        },
      }));
    }

    let orderClause;
    switch (params.sort) {
      case 'name':
        orderClause = { BookTitle: 'asc' };
        break;
      case 'priceHighToLow':
        orderClause = { BookPrice: 'desc' };
        break;
      case 'priceLowToHigh':
        orderClause = { BookPrice: 'asc' };
        break;
      case 'popularity':
        orderClause = { Rating: 'desc' };
        break;
      default:
        orderClause = { CreatedAt: 'asc' };
    }

    const total = await this.prisma.book.count({
      where: whereClause,
    });

    const data = await this.prisma.book.findMany({
      skip: (params.page - 1) * params.size,
      take: params.size,
      orderBy: orderClause,
      select: {
        BookTitle: true,
        AuthorBy: true,
        BookID: true,
        BookPrice: true,
        ImageURL: true,
        Rating: true,
        CategoryID: true,
      },
      where: whereClause,
    });

    return { data, total };
  }
  async countAvailableBooks(params: { input }) {
    const result = await this.prisma.book.count({
      where: {
        BookTitle: {
          contains: params.input,
        },
        IsBookActive: true,
        IsOutOfStock: false,
      },
      orderBy: {
        CreatedAt: 'desc',
      },
    });
    return result;
  }

  async findAll(
    page: number,
    size: number,
    search?: string,
  ): Promise<BookEntity[]> {
    return this.prisma.book.findMany({
      skip: (page - 1) * size,
      take: size,
      ...(search && {
        where: { BookTitle: { contains: search, mode: 'insensitive' } },
      }),
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

  async countAll(search?: string) {
    return this.prisma.book.count(
      search
        ? {
            where: {
              BookTitle: {
                contains: search,
                mode: 'insensitive',
              },
            },
          }
        : undefined,
    );
  }

  async updateRating(BookID: string, rating: number) {
    return this.prisma.book.update({
      where: {
        BookID: BookID,
      },
      data: {
        Rating: rating,
      },
    });
  }

  async getOnSaleBooks(onSaleBookIds: string[]) {
    const books = await this.prisma.book.findMany({
      where: {
        BookID: {
          in: onSaleBookIds,
        },
      },
    });

    return onSaleBookIds.map((id) => books.find((book) => book.BookID === id));
  }

  async getRecommendedBooks(size: number) {
    return this.prisma.book.findMany({
      take: size,
      orderBy: {
        Rating: 'desc',
      },
    });
  }
}
