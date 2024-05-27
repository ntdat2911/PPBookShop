import { Controller, Get, Logger, Query, Render } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { BooksService } from '../books/books.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly bookService: BooksService) {}

  @Public()
  @Get()
  @Render('book/bookTable')
  async root(@Query() query) {
    const bookList = await this.bookService.getAllBooks(1, 20);
    return { bookList: bookList };
  }

  @Public()
  @Get('/login')
  @Render('auth/login')
  public Login() {
    return { layout: 'auth_layout' };
  }

  @Public()
  @Get('/book-management')
  @Render('book/bookTable')
  public async BookManagement(@Query() query) {
    const bookList = await this.bookService.getAllBooks(1, 10);

    return { bookList: bookList };
  }

  @Public()
  @Get('/category-management')
  @Render('category/categoryTable')
  public CategoryManagement() {
    return {};
  }

  @Public()
  @Get('/promotion-management')
  @Render('promotion/promotionTable')
  public PromotionManagement() {
    return {};
  }

  @Public()
  @Get('/process-orders-management')
  @Render('process-order/processOrderTable')
  public ProcessOrderManagement() {
    return {};
  }

  @Public()
  @Get('/review-management')
  @Render('review/reviewTable')
  public ReviewManagement() {
    return {};
  }
}
