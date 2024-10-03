import { Injectable } from '@nestjs/common';
import { BooksService } from '../books/books.service';
import { AuthorsService } from '../authors/authors.service';
import { CategoriesService } from '../categories/categories.service';
import { ReviewsService } from '../reviews/reviews.service';
import { PromotionsService } from '../promotions/promotions.service';
import { OrdersService } from '../orders/orders.service';
import { AddressesService } from '../addresses/addresses.service';
import { OrderItemsService } from '../order-items/order-items.service';
import { PrismaService } from 'src/database/prisma.service';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
    private readonly categoriesService: CategoriesService,
    private readonly reviewsService: ReviewsService,
    private readonly promotionsService: PromotionsService,
    private readonly ordersService: OrdersService,
    private readonly addressService: AddressesService,
    private readonly orderItemsService: OrderItemsService,
    private readonly adminRepository: AdminRepository,
  ) {}

  public async getBookManagementData(
    page: number,
    size: number,
    search: string,
  ) {
    page = page || 1;
    size = size || 5;
    const [bookList, authorList, categoryList] = await Promise.all([
      this.booksService.getAllBooks(page, size, search),
      this.authorsService.getAuthors(),
      this.categoriesService.getCategories(),
    ]);
    const count = await this.booksService.countAll(search);
    const newBookList: Object[] = [...bookList];
    bookList.forEach((book, index) => {
      const AuthorName = authorList.find(
        (author) => author.AuthorID === book.AuthorBy,
      ).AuthorName;
      const CategoryName = categoryList.find(
        (category) => category.CategoryID === book.CategoryID,
      ).CategoryName;
      newBookList[index] = {
        ...book,
        AuthorName,
        CategoryName,
      };
    });
    const pageCount = Math.ceil(count / size);
    return {
      pagyInfo: {
        page,
        count: size,
        pageCount,
      },
      bookList: newBookList,
      authorList,
      categoryList,
    };
  }

  public async getBookEditData(BookID: string) {
    const [book, authorList, categoryList] = await Promise.all([
      this.booksService.getBookById(BookID),
      this.authorsService.getAuthors(),
      this.categoriesService.getCategories(),
    ]);
    return {
      book,
      authorList,
      categoryList,
    };
  }

  public async getCategoryManagementData(
    page: number,
    size: number,
    search: string,
  ) {
    page = page || 1;
    size = size || 5;
    const categoryList = await this.categoriesService.getPaginationCategories(
      page,
      size,
      search,
    );

    const count = await this.categoriesService.countAll(search);
    const pageCount = Math.ceil(count / size);
    return {
      pagyInfo: {
        page,
        count: size,
        pageCount,
      },
      categoryList,
    };
  }

  public async getAuthorManagementData(
    page: number,
    size: number,
    search: string,
  ) {
    page = page || 1;
    size = size || 5;
    const authorList = await this.authorsService.getPaginationAuthors(
      page,
      size,
      search,
    );
    const count = await this.authorsService.countAll(search);
    const pageCount = Math.ceil(count / size);
    return {
      pagyInfo: {
        page,
        count: size,
        pageCount,
      },
      authorList,
    };
  }

  public async getReviewManagementData(page: number, size: number) {
    page = page || 1;
    size = size || 5;
    const reviewList = await this.reviewsService.getReviews(page, size);
    const count = await this.reviewsService.countAll();
    const pageCount = Math.ceil(count / size);
    return {
      pagyInfo: {
        page,
        count: size,
        pageCount,
      },
      reviewList,
    };
  }

  public async getPromotionManagementData(page: number, size: number) {
    page = page || 1;
    size = size || 5;
    const promotionList = await this.promotionsService.getPaginationPromotions(
      page,
      size,
    );
    const count = await this.promotionsService.countAll();
    const pageCount = Math.ceil(count / size);
    const bookList = await this.booksService.getAllBooks(1, 1000);
    return {
      pagyInfo: {
        page,
        count: size,
        pageCount,
      },
      promotionList,
      bookList,
    };
  }

  public async getPromotionEditData(PromotionID: string) {
    const [{ promotion, bookPromotionList }, bookList] = await Promise.all([
      this.promotionsService.getDetailPromotion(PromotionID),
      this.booksService.getAllBooks(1, 1000),
    ]);
    return {
      promotion,
      bookPromotionList,
      bookList,
    };
  }

  public async getOrderManagementData(
    page: number,
    size: number,
    status?: string,
  ) {
    page = page || 1;
    size = size || 5;
    const orderList = await this.ordersService.getAllOrders(page, size, status);
    const newOrderList = await Promise.all(
      orderList.map(async (order) => {
        const address = await this.addressService.getAddressByAddressID(
          order.AddressID,
        );
        return {
          ...order,
          Address: address.Address,
        };
      }),
    );
    const count = await this.ordersService.countAll(status);
    const pageCount = Math.ceil(count / size);
    const OrderStatus = await this.ordersService.getOrderStatus();
    return {
      pagyInfo: {
        page,
        count: size,
        pageCount,
      },
      orderList: newOrderList,
      OrderStatus,
    };
  }

  async getOrderDetailData(OrderID: string) {
    const order = await this.ordersService.getOrderByID(OrderID);
    const orderItems =
      await this.orderItemsService.getOrderItemsByOrderId(OrderID);

    await Promise.all(
      orderItems.map(async (orderItem) => {
        const book = await this.booksService.getBookById(orderItem.BookID);
        orderItem.BookImage = book.ImageURL;
      }),
    );
    return {
      order,
      orderItems,
    };
  }
  public async findOneByEmail(email: string) {
    const user = await this.adminRepository.findOne({
      where: { Email: email.toLowerCase() },
    });
    return user;
  }
  public async findOneByUsername(username: string) {
    const user = await this.adminRepository.findOne({
      where: { AdminName: username.toLowerCase() },
    });

    return user;
  }
}
