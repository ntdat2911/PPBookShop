import {
  Controller,
  Get,
  Logger,
  Param,
  Query,
  Render,
  Req,
} from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { BooksService } from '../books/books.service';
import { AuthorsService } from '../authors/authors.service';
import { CategoriesService } from '../categories/categories.service';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly bookService: BooksService,
    private readonly authorService: AuthorsService,
    private readonly CategoryService: CategoriesService,
  ) {}

  @Public()
  @Get()
  @Render('book/bookTable')
  async root(@Query() query, @Req() req) {
    const { page, size } = query;
    const { bookList, authorList, categoryList, pagyInfo } =
      await this.adminService.getBookManagementData(page, size);
    const path = '/admin/book-management';
    return {
      pagyInfo,
      bookList,
      authorList,
      categoryList,
      req,
      path,
    };
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
  public async BookManagement(@Query() query, @Req() req) {
    const { page, size } = query;
    const { bookList, authorList, categoryList, pagyInfo } =
      await this.adminService.getBookManagementData(page, size);
    const path = '/admin/book-management';

    return {
      pagyInfo,
      bookList,
      authorList,
      categoryList,
      req,
      path,
    };
  }

  @Public()
  @Get('/book-management/edit/:BookID')
  @Render('book/editBook')
  public async EditBook(@Param('BookID') BookID: string) {
    const { book, authorList, categoryList } =
      await this.adminService.getBookEditData(BookID);

    return {
      book,
      authorList,
      categoryList,
    };
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
