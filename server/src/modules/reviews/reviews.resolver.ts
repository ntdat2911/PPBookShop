import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { ReviewEntity } from './entities/review.entity';
import { Public } from '../auth/decorators/public.decorator';
import { UsersService } from '../users/users.service';
import { GReviewPaginationRequest } from './dtos/review-pagination.dto';
import {
  GReviewPaginationResponse,
  OverviewReviewResponse,
} from './interfaces/review-response.interface';
import { GCreateReviewRequest } from './dtos/create-review.dto';

@Resolver(() => ReviewEntity)
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly usersService: UsersService,
  ) {}

  // @Mutation(() => ReviewEntity)
  // async createReview(@Args('data') data: ReviewEntity) {
  //   return this.reviewsService.createReview(data);
  // }

  @Public()
  @Query(() => OverviewReviewResponse)
  async getReviewOverviewById(@Args('id') id: string) {
    console.log('id', id);
    return this.reviewsService.getReviewOverviewById(id);
  }

  @Public()
  @Query(() => GReviewPaginationResponse)
  async getReviewsByBookId(@Args('params') params: GReviewPaginationRequest) {
    return this.reviewsService.getReviewsByBookId(params);
  }

  @ResolveField(() => String)
  async Username(@Parent() review: ReviewEntity): Promise<string> {
    const user = await this.usersService.findOneById(review.UserID);
    return user.UserName;
  }

  @Public()
  @Mutation(() => ReviewEntity)
  async createReview(@Args('data') data: GCreateReviewRequest) {
    return this.reviewsService.createReview(data);
  }
}
