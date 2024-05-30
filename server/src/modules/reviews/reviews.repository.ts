import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

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
}
