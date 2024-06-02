import { Controller, Delete, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('api/reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    // private readonly usersService: UsersService,
  ) {}

  @Public()
  @Delete('/:id')
  async deleteReview(@Param('id') id: string) {
    return this.reviewsService.deleteReview(id);
  }
}
