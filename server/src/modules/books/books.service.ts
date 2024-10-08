import { Injectable, Logger } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { CommonService } from '../common/common.service';
import { PrismaService } from '../../database/prisma.service';
import { GPaginationRequest } from './dtos/pagination.dto';
import { BookEntity } from './entities/book.entity';
import { GPaginatedBookResponse } from './interfaces/books-response.interface';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { RatingEnumRange } from './types/ratingEnumRange';
import { PromotionsService } from '../promotions/promotions.service';
import { OrderItemsService } from '../order-items/order-items.service';

@Injectable()
export class BooksService {
  constructor(
    private booksRepository: BooksRepository,
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly promotionService: PromotionsService,
    private readonly orderItemsService: OrderItemsService,
  ) {}

  public async getBooks(
    params: GPaginationRequest,
  ): Promise<GPaginatedBookResponse> {
    const { page, size, input, category, rating, author, sort } = params;
    //split the rating string into an array
    const ratings = rating ? rating.split(',') : [];
    const categories = category ? category.split(',') : [];
    const authors = author ? author.split(',') : [];
    const ratingRanges = ratings.map((r) => RatingEnumRange[parseInt(r)]);

    const { data, total } = await this.booksRepository.findByFilter({
      page,
      size,
      input,
      category: categories,
      ratingRanges: ratingRanges,
      author: authors,
      sort,
    });

    const result: GPaginatedBookResponse = {
      page: page,
      size: size,
      count: total,
      records: data,
    };

    return result;
  }

  public async getAllBooks(
    page: number,
    size: number,
    search?: string,
  ): Promise<BookEntity[]> {
    const res = await this.booksRepository.findAll(page, size, search);
    return res;
  }

  public async createBook(formData: any, file: any): Promise<BookEntity> {
    if (file) {
      const res = await this.cloudinaryService.uploadFile(file);
      formData.ImageURL = res.secure_url;
    } else {
      formData.ImageURL =
        'https://res.cloudinary.com/dmntvhux1/image/upload/v1716950017/cover_book_template_wx5gh8.jpg';
    }
    formData.BookPrice = parseFloat(formData.BookPrice);
    formData.PublishDate = new Date(formData.PublishDate);
    formData.IsBookActive = formData.IsBookActive === 'true';
    formData.IsOutOfStock = formData.IsOutOfStock === 'true';
    const book = await this.booksRepository.create(formData);
    return book;
  }

  public async updateActiveStatus(BookID: string, IsBookActive: boolean) {
    const book = await this.booksRepository.updateActiveStatus(
      BookID,
      IsBookActive,
    );
    return book;
  }

  public async getBookById(BookID: string) {
    const book = await this.booksRepository.getBookById(BookID);
    return book;
  }

  public async updateBook(formData: any, file: any) {
    if (file && !formData.ImageURL) {
      const res = await this.cloudinaryService.uploadFile(file);
      formData.ImageURL = res.secure_url;
    } else {
      formData.ImageURL = formData.ImageURL;
    }
    formData.BookPrice = parseFloat(formData.BookPrice);
    formData.PublishDate = new Date(formData.PublishDate);
    formData.IsBookActive = formData.IsBookActive === 'true';
    formData.IsOutOfStock = formData.IsOutOfStock === 'true';
    const book = await this.booksRepository.updateBook(formData);
    return book;
  }

  public async countAll(search?: string) {
    const result = await this.booksRepository.countAll(search);
    return result;
  }

  public async updateRating(BookID: string, rating: number) {
    const book = await this.booksRepository.updateRating(BookID, rating);
    return book;
  }

  public async getOnSaleBooks(size: number) {
    const onSaleBookIds = await this.promotionService.getOnSaleBooks(size);
    const booksId = onSaleBookIds.map((item) => item.BookID);
    let books = await this.booksRepository.getOnSaleBooks(booksId);
    books = books.filter((book) => book !== null && book !== undefined);
    return books;
  }

  public async getRecommendedBooks(size: number) {
    const recommendedBooks = this.booksRepository.getRecommendedBooks(size);
    return recommendedBooks;
  }

  public async getPopularBooks(size: number) {
    const popularBookIds = await this.orderItemsService.getPopularBooks(size);

    const booksId = popularBookIds.map((item) => item.BookID);
    let books = await this.booksRepository.getOnSaleBooks(booksId);
    books = books.filter((book) => book !== null && book !== undefined);

    return books;
  }
}
