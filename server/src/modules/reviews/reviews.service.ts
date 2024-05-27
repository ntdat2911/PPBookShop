import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async createReview(data: {
    BookID: string;
    UserID: string;
    ReviewTitle: string;
    Comment: string;
    Rating: number;
  }) {
    return this.reviewRepository.createReview(data);
  }

  async getReviews() {
    return this.reviewRepository.getReviews();
  }

  async getReviewById(id: string) {
    return this.reviewRepository.getReviewById(id);
  }

  async updateReview(id: string, data: { ReviewText: string; Rating: number }) {
    return this.reviewRepository.updateReview(id, data);
  }

  async getReviewsByBookId(id: string) {
    return this.reviewRepository.getReviewsByBookId(id);
  }
}
