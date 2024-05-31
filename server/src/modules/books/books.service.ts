import { Injectable, Logger } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { CommonService } from '../common/common.service';
import { PrismaService } from 'src/database/prisma.service';
import { GPaginationRequest } from './dtos/pagination.dto';
import { BookEntity } from './entities/book.entity';
import { GPaginatedBookResponse } from './interfaces/books-response.interface';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class BooksService {
  constructor(
    private booksRepository: BooksRepository,
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  public async getBooks(
    params: GPaginationRequest,
  ): Promise<GPaginatedBookResponse> {
    const { page, size, input, category, rating, author } = params;
    //split the rating string into an array
    const ratings = rating ? rating.split(',') : [];
    const categories = category ? category.split(',') : [];

    console.log(ratings, categories, author);

    const books = await this.booksRepository.findByFilter();

    // filter the books by rating, category, and author and book title
    const filteredBooks = books.filter((book) => {
      //check if the book title contains the input
      const isBookTitleMatch = book.BookTitle.toLowerCase().includes(
        input.toLowerCase(),
      );

      const isRatingMatch = ratings.length
        ? ratings.includes(book.Rating.toString())
        : true;
      const isCategoryMatch = categories.length
        ? categories.includes(book.CategoryID)
        : true;
      const isAuthorMatch = author ? author === book.AuthorBy : true;
      return (
        isRatingMatch && isCategoryMatch && isAuthorMatch && isBookTitleMatch
      );
    });

    const count = filteredBooks.length;

    //paginate the books based on the page and size after filtering
    const skip = (page - 1) * size;
    const take = size;
    //slice the books based on the skip and take
    const paginatedBooks = filteredBooks.slice(skip, skip + take);

    const result: GPaginatedBookResponse = {
      page: page,
      size: size,
      count: count,
      records: paginatedBooks,
    };
    return result;
  }

  public async getAllBooks(page: number, size: number): Promise<BookEntity[]> {
    const res = await this.booksRepository.findAll(page, size);
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
    console.log(formData);
    const book = await this.booksRepository.updateBook(formData);
    return book;
  }

  public async countAll() {
    const result = await this.booksRepository.countAll();
    return result;
  }
}
