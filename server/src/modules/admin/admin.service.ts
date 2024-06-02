import { Injectable } from '@nestjs/common';
import { BooksService } from '../books/books.service';
import { AuthorsService } from '../authors/authors.service';
import { CategoriesService } from '../categories/categories.service';
import { ReviewsService } from '../reviews/reviews.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
    private readonly categoriesService: CategoriesService,
    private readonly reviewsService: ReviewsService,
  ) {}

  public async getBookManagementData(page: number, size: number) {
    page = page || 1;
    size = size || 5;
    const [bookList, authorList, categoryList] = await Promise.all([
      this.booksService.getAllBooks(page, size),
      this.authorsService.getAuthors(),
      this.categoriesService.getCategories(),
    ]);
    const count = await this.booksService.countAll();
    const newBookList: Object[] = [...bookList];
    bookList.forEach((book, index) => {
      const AuthorName = authorList.find(
        (author) => author.AuthorID === book.AuthorBy,
      ).AuthorName;
      const CategoryName = categoryList.find(
        (category) => category.CategoryID === book.CategoryID,
      ).CategoryName;
      newBookList[index] = {
        ...book,
        AuthorName,
        CategoryName,
      };
    });
    const pageCount = Math.ceil(count / size);
    return {
      pagyInfo: {
        page,
        count: size,
        pageCount,
      },
      bookList: newBookList,
      authorList,
      categoryList,
    };
  }

  public async getBookEditData(BookID: string) {
    const [book, authorList, categoryList] = await Promise.all([
      this.booksService.getBookById(BookID),
      this.authorsService.getAuthors(),
      this.categoriesService.getCategories(),
    ]);
    return {
      book,
      authorList,
      categoryList,
    };
  }

  public async getCategoryManagementData(page: number, size: number) {
    page = page || 1;
    size = size || 5;
    const categoryList = await this.categoriesService.getPaginationCategories(
      page,
      size,
    );

    const count = await this.categoriesService.countAll();
    const pageCount = Math.ceil(count / size);
    return {
      pagyInfo: {
        page,
        count: size,
        pageCount,
      },
      categoryList,
    };
  }

  public async getAuthorManagementData(page: number, size: number) {
    page = page || 1;
    size = size || 5;
    const authorList = await this.authorsService.getPaginationAuthors(
      page,
      size,
    );
    const count = await this.authorsService.countAll();
    const pageCount = Math.ceil(count / size);
    return {
      pagyInfo: {
        page,
        count: size,
        pageCount,
      },
      authorList,
    };
  }

  public async getReviewManagementData(page: number, size: number) {
    page = page || 1;
    size = size || 5;
    const reviewList = await this.reviewsService.getReviews(page, size);
    const count = await this.reviewsService.countAll();
    const pageCount = Math.ceil(count / size);
    return {
      pagyInfo: {
        page,
        count: size,
        pageCount,
      },
      reviewList,
    };
  }
}
