import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './reviews.repository';
import { GReviewPaginationRequest } from './dtos/review-pagination.dto';
import {
  GReviewPaginationResponse,
  OverviewReviewResponse,
} from './interfaces/review-response.interface';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly usersService: UsersService,
    private readonly booksService: BooksService,
  ) {}

  async createReview(data: {
    BookID: string;
    UserID: string;
    ReviewTitle: string;
    Comment: string;
    Rating: number;
  }) {
    return this.reviewRepository.createReview(data);
  }

  async getReviews(page: number, size: number) {
    const reviewList = await this.reviewRepository.getReviews(page, size);
    const result = [];
    reviewList.forEach(async (review) => {
      const user = await this.usersService.findOneById(review.UserID);
      const book = await this.booksService.getBookById(review.BookID);
      result.push({
        ...review,
        UserName: user.UserName,
        BookTitle: book.BookTitle,
      });
    });
    return result;
  }

  async getReviewById(id: string) {
    return this.reviewRepository.getReviewById(id);
  }

  async updateReview(id: string, data: { ReviewText: string; Rating: number }) {
    return this.reviewRepository.updateReview(id, data);
  }

  async getReviewOverviewById(id: string): Promise<OverviewReviewResponse> {
    const total = await this.reviewRepository.countAllByBookID(id);
    const countList: number[] = [];
    for (let i = 1; i <= 5; i++) {
      const count = await this.reviewRepository.countByRating(id, i);
      countList.push(count);
    }
    const averageRating: number = countList.reduce(
      (acc: number, curr: number, index: number) => {
        return acc + curr * (index + 1);
      },
      0,
    );
    return {
      total,
      countReviewList: countList,
      averageRating: averageRating / total,
    };
  }

  async getReviewsByBookId(
    params: GReviewPaginationRequest,
  ): Promise<GReviewPaginationResponse> {
    const { page, size, bookID, rating } = params;

    const result = await this.reviewRepository.getReviewsByBookIdFilter(params);

    const count = await this.reviewRepository.countByRating(bookID, rating);
    return {
      page,
      size,
      count,
      records: result,
    };
  }

  async countAll() {
    return this.reviewRepository.countAll();
  }
}
