import { Args, Query, Resolver } from '@nestjs/graphql';
import { Public } from '../auth/decorators/public.decorator';
import { BooksService } from './books.service';
import { GPaginationRequest } from './dtos/pagination.dto';
import { GPaginatedBookResponse } from './interfaces/books-response.interface';
import { BookEntity } from './entities/book.entity';

@Resolver(() => BookEntity)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Public()
  @Query(() => GPaginatedBookResponse)
  async getBooks(
    @Args('params') params: GPaginationRequest,
  ): Promise<GPaginatedBookResponse> {
    console.log('GET_BOOKS ', params);
    return this.booksService.getBooks(params);
  }
}
