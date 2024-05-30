import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GReviewPaginationRequest } from './dtos/review-pagination.dto';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(data: {
    BookID: string;
    UserID: string;
    ReviewTitle: string;
    Comment: string;
    Rating: number;
  }) {
    return this.prisma.review.create({
      data,
    });
  }

  async getReviews() {
    return this.prisma.review.findMany();
  }

  async getReviewById(id: string) {
    return this.prisma.review.findUnique({
      where: {
        ReviewID: id,
      },
    });
  }

  async updateReview(id: string, data: { ReviewText: string; Rating: number }) {
    return this.prisma.review.update({
      where: {
        ReviewID: id,
      },
      data,
    });
  }

  async getReviewsByBookId(id: string) {
    return this.prisma.review.findMany({
      where: {
        BookID: id,
      },
    });
  }
  async getReviewsByBookIdFilter(params: GReviewPaginationRequest) {
    //if rating is not provided, return all reviews
    const res = await this.prisma.review.findMany({
      skip: (params.page - 1) * params.size,
      take: params.size,
      where: {
        BookID: params.bookID,
        Rating: params.rating,
      },
    });
    return res;
  }
  async countAllByBookID(BookID: string) {
    return this.prisma.review.count({
      where: {
        BookID,
      },
    });
  }
  async countByRating(BookID: string, Rating: number) {
    return this.prisma.review.count({
      where: {
        BookID,
        Rating: Rating,
      },
    });
  }
}
