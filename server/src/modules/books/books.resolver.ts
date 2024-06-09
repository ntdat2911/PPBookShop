import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Public } from '../auth/decorators/public.decorator';
import { BooksService } from './books.service';
import { GPaginationRequest } from './dtos/pagination.dto';
import { GPaginatedBookResponse } from './interfaces/books-response.interface';
import { BookEntity } from './entities/book.entity';
import { AuthorsService } from '../authors/authors.service';
import { AuthorEntity } from '../authors/entities/author.entity';
import { CategoriesService } from '../categories/categories.service';
import { PromotionEntity } from '../promotions/entities/promotion.entity';
import { PromotionsService } from '../promotions/promotions.service';
import { OrderItemsService } from '../order-items/order-items.service';

@Resolver(() => BookEntity)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
    private readonly categoriesService: CategoriesService,
    private readonly promotionsService: PromotionsService,
    private readonly orderItemsService: OrderItemsService,
  ) {}

  @Public()
  @Query(() => GPaginatedBookResponse)
  async getBooks(
    @Args('params') params: GPaginationRequest,
  ): Promise<GPaginatedBookResponse> {
    return this.booksService.getBooks(params);
  }

  @ResolveField(() => String)
  async AuthorName(@Parent() book: BookEntity): Promise<string> {
    const author: AuthorEntity = await this.authorsService.getAuthorById(
      book.AuthorBy,
    );
    return author.AuthorName;
  }

  @Public()
  @Query(() => BookEntity)
  async getBookById(@Args('id') id: string): Promise<BookEntity> {
    return this.booksService.getBookById(id);
  }

  @ResolveField(() => String)
  async CategoryName(@Parent() book: BookEntity): Promise<string> {
    const category = await this.categoriesService.getCategoryById(
      book.CategoryID,
    );
    return category.CategoryName;
  }

  @ResolveField(() => [PromotionEntity], { nullable: true })
  async Promotion(@Parent() book: BookEntity): Promise<PromotionEntity[]> {
    const result = await this.promotionsService.getPromotionByBookID(
      book.BookID,
    );
    return result || [];
  }

  @Public()
  @Query(() => [BookEntity])
  async getOnSaleBooks(@Args('size') size: number): Promise<BookEntity[]> {
    return await this.booksService.getOnSaleBooks(size);
  }

  @Public()
  @Query(() => [BookEntity])
  async getRecommendedBooks(@Args('size') size: number): Promise<BookEntity[]> {
    return await this.booksService.getRecommendedBooks(size);
  }

  @Public()
  @Query(() => [BookEntity])
  async getPopularBooks(@Args('size') size: number): Promise<BookEntity[]> {
    return await this.booksService.getPopularBooks(size);
  }

  @ResolveField(() => Number, { nullable: true })
  async SoldQuantity(@Parent() book: BookEntity): Promise<number> {
    return await this.orderItemsService.getSoldBookByBookId(book.BookID);
  }
}
