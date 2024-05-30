import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { ReviewEntity } from './entities/review.entity';
import { Public } from '../auth/decorators/public.decorator';

@Resolver()
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  // @Mutation(() => ReviewEntity)
  // async createReview(@Args('data') data: ReviewEntity) {
  //   return this.reviewsService.createReview(data);
  // }
  @Public()
  @Query(() => [ReviewEntity])
  async getReviews() {
    return this.reviewsService.getReviews();
  }

  @Query(() => ReviewEntity)
  async getReviewById(@Args('id') id: string) {
    return this.reviewsService.getReviewById(id);
  }
}
