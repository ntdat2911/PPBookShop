import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PrismaService } from '../../database/prisma.service';
import { PromotionsService } from '../promotions/promotions.service';
import { OrderItemsService } from '../order-items/order-items.service';
import { RatingEnumRange } from './types/ratingEnumRange';

describe('BooksService', () => {
  let service: BooksService;
  let mockBooksRepository = {
    findByFilter: jest.fn().mockResolvedValue({
      data: [
        {
          BookID: '1',
          BookTitle: 'Test Book',
          AuthorBy: 'John Doe',
          BookPrice: 20,
          ImageURL: 'http://example.com/test.jpg',
          IsBookActive: true,
          IsOutOfStock: false,
          BookDescription: 'This is a test book',
          CategoryID: '1',
          PublishDate: '2021-09-01T00:00:00.000Z',
        },
      ],
      total: 1,
    }),
    getBookById: jest.fn().mockResolvedValue({
      BookID: '1',
      BookTitle: 'Test Book',
      AuthorBy: 'John Doe',
      BookPrice: 20,
      ImageURL: 'http://example.com/test.jpg',
      IsBookActive: true,
      IsOutOfStock: false,
      BookDescription: 'This is a test book',
      CategoryID: '1',
      PublishDate: '2021-09-01T00:00:00.000Z',
    }),
    create: jest.fn().mockResolvedValue({
      BookID: '1',
      BookTitle: 'Test Book',
      AuthorBy: 'John Doe',
      BookPrice: 20,
      ImageURL: 'http://example.com/test.jpg',
      IsBookActive: true,
      IsOutOfStock: false,
      BookDescription: 'This is a test book',
      CategoryID: '1',
      PublishDate: '2021-09-01T00:00:00.000Z',
    }),
    updateBook: jest.fn().mockResolvedValue({
      BookID: '1',
      BookTitle: 'Test Book',
      AuthorBy: 'John Doe',
      BookPrice: 20,
      ImageURL: 'http://example.com/test.jpg',
      IsBookActive: true,
      IsOutOfStock: false,
      BookDescription: 'This is a test book',
      CategoryID: '1',
      PublishDate: '2021-09-01T00:00:00.000Z',
    }),
    findAll: jest.fn().mockResolvedValue([
      {
        BookID: '1',
        BookTitle: 'Test Book 1',
        AuthorBy: 'John Doe',
        BookPrice: 20,
        ImageURL: 'http://example.com/test1.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is a test book 1',
        CategoryID: '1',
        PublishDate: '2021-09-01T00:00:00.000Z',
      },
      {
        BookID: '2',
        BookTitle: 'Test Book 2',
        AuthorBy: 'Jane Doe',
        BookPrice: 25,
        ImageURL: 'http://example.com/test2.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is a test book 2',
        CategoryID: '2',
        PublishDate: '2021-09-01T00:00:00.000Z',
      },
    ]),
    getAllBooks: jest.fn().mockResolvedValue([
      {
        BookID: '1',
        BookTitle: 'Test Book 1',
        AuthorBy: 'John Doe',
        BookPrice: 20,
        ImageURL: 'http://example.com/test1.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is a test book 1',
        CategoryID: '1',
        PublishDate: '2021-09-01T00:00:00.000Z',
      },
      {
        BookID: '2',
        BookTitle: 'Test Book 2',
        AuthorBy: 'Jane Doe',
        BookPrice: 25,
        ImageURL: 'http://example.com/test2.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is a test book 2',
        CategoryID: '2',
        PublishDate: '2021-09-01T00:00:00.000Z',
      },
    ]),
    updateActiveStatus: jest.fn().mockResolvedValue({
      BookID: '1',
      BookTitle: 'Test Book',
      AuthorBy: 'John Doe',
      BookPrice: 20,
      ImageURL: 'http://example.com/test.jpg',
      IsBookActive: false,
      IsOutOfStock: false,
      BookDescription: 'This is a test book',
      CategoryID: '1',
      PublishDate: '2021-09-01T00:00:00.000Z',
    }),
    countAll: jest.fn().mockResolvedValue(10),
    updateRating: jest.fn().mockResolvedValue({
      BookID: '1',
      BookTitle: 'Test Book',
      AuthorBy: 'John Doe',
      BookPrice: 20,
      ImageURL: 'http://example.com/test.jpg',
      IsBookActive: true,
      IsOutOfStock: false,
      BookDescription: 'This is a test book',
      CategoryID: '1',
      PublishDate: '2021-09-01T00:00:00.000Z',
      Rating: 4.5,
    }),
    getOnSaleBooks: jest.fn().mockResolvedValue([
      {
        BookID: '1',
        BookTitle: 'Test Book 1',
        AuthorBy: 'John Doe',
        BookPrice: 20,
        ImageURL: 'http://example.com/test1.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is a test book 1',
        CategoryID: '1',
        PublishDate: '2021-09-01T00:00:00.000Z',
      },
      {
        BookID: '2',
        BookTitle: 'Test Book 2',
        AuthorBy: 'Jane Doe',
        BookPrice: 25,
        ImageURL: 'http://example.com/test2.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is a test book 2',
        CategoryID: '2',
        PublishDate: '2021-09-01T00:00:00.000Z',
      },
    ]),
    getRecommendedBooks: jest.fn().mockResolvedValue([
      {
        BookID: '1',
        BookTitle: 'Test Book 1',
        AuthorBy: 'John Doe',
        BookPrice: 20,
        ImageURL: 'http://example.com/test1.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is a test book 1',
        CategoryID: '1',
        PublishDate: '2021-09-01T00:00:00.000Z',
      },
      {
        BookID: '2',
        BookTitle: 'Test Book 2',
        AuthorBy: 'Jane Doe',
        BookPrice: 25,
        ImageURL: 'http://example.com/test2.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is a test book 2',
        CategoryID: '2',
        PublishDate: '2021-09-01T00:00:00.000Z',
      },
    ]),
    getPopularBooks: jest.fn().mockResolvedValue([
      {
        BookID: '1',
        BookTitle: 'Test Book 1',
        AuthorBy: 'John Doe',
        BookPrice: 20,
        ImageURL: 'http://example.com/test1.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is a test book 1',
        CategoryID: '1',
        PublishDate: '2021-09-01T00:00:00.000Z',
      },
      {
        BookID: '2',
        BookTitle: 'Test Book 2',
        AuthorBy: 'Jane Doe',
        BookPrice: 25,
        ImageURL: 'http://example.com/test2.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is a test book 2',
        CategoryID: '2',
        PublishDate: '2021-09-01T00:00:00.000Z',
      },
    ]),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: BooksRepository, useValue: mockBooksRepository },
        { provide: PrismaService, useValue: {} },
        { provide: CloudinaryService, useValue: {} },
        { provide: PromotionsService, useValue: {} },
        { provide: OrderItemsService, useValue: {} },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBooks', () => {
    it('should return a paginated list of books', async () => {
      // Arrange
      const params = {
        page: 1,
        size: 10,
        input: 'Test Book',
        category: '1',
        rating: '5',
        author: 'John Doe',
        sort: 'asc',
      };
      const expectedBooks = {
        page: params.page,
        size: params.size,
        count: 1,
        records: [
          {
            BookID: '1',
            BookTitle: 'Test Book',
            AuthorBy: params.author,
            BookPrice: 20,
            ImageURL: 'http://example.com/test.jpg',
            IsBookActive: true,
            IsOutOfStock: false,
            BookDescription: 'This is a test book',
            CategoryID: params.category,
            PublishDate: '2021-09-01T00:00:00.000Z',
          },
        ],
      };
      mockBooksRepository.findByFilter.mockResolvedValue({
        data: expectedBooks.records,
        total: expectedBooks.count,
      });

      // Act
      const result = await service.getBooks(params);

      // Assert
      expect(result).toEqual(expectedBooks);
      expect(mockBooksRepository.findByFilter).toHaveBeenCalledWith({
        page: params.page,
        size: params.size,
        input: params.input,
        category: [params.category],
        ratingRanges: [RatingEnumRange[parseInt(params.rating)]],
        author: [params.author],
        sort: params.sort,
      });
    });
  });

  describe('getAllBooks', () => {
    it('should return all books', async () => {
      const page = 1;
      const size = 10;
      const expectedBooks = [
        {
          BookID: '1',
          BookTitle: 'Test Book 1',
          AuthorBy: 'John Doe',
          BookPrice: 20,
          ImageURL: 'http://example.com/test1.jpg',
          IsBookActive: true,
          IsOutOfStock: false,
          BookDescription: 'This is a test book 1',
          CategoryID: '1',
          PublishDate: '2021-09-01T00:00:00.000Z',
        },
        {
          BookID: '2',
          BookTitle: 'Test Book 2',
          AuthorBy: 'Jane Doe',
          BookPrice: 25,
          ImageURL: 'http://example.com/test2.jpg',
          IsBookActive: true,
          IsOutOfStock: false,
          BookDescription: 'This is a test book 2',
          CategoryID: '2',
          PublishDate: '2021-09-01T00:00:00.000Z',
        },
      ];
      mockBooksRepository.getAllBooks.mockResolvedValue(expectedBooks);

      const result = await service.getAllBooks(page, size);
      expect(result).toEqual(expectedBooks);
      expect(mockBooksRepository.getAllBooks).toHaveBeenCalledWith(page, size);
    });
  });
  describe('createBook', () => {
    it('should create a book', async () => {
      const formData = {
        BookTitle: 'Test Book',
        AuthorBy: 'John Doe',
        BookPrice: '20',
        ImageURL: 'http://example.com/test.jpg',
        IsBookActive: 'true',
        IsOutOfStock: 'false',
        BookDescription: 'This is a test book',
        CategoryID: '1',
        PublishDate: '2021-09-01T00:00:00.000Z',
      };
      const file = {};
      const expectedBook = {
        BookID: '1',
        BookTitle: 'Test Book',
        AuthorBy: 'John Doe',
        BookPrice: 20,
        ImageURL: 'http://example.com/test.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is a test book',
        CategoryID: '1',
        PublishDate: '2021-09-01T00:00:00.000Z',
      };
      mockBooksRepository.create.mockResolvedValue(expectedBook);

      const result = await service.createBook(formData, file);

      expect(result).toEqual(expectedBook);
      expect(mockBooksRepository.create).toHaveBeenCalledWith({
        BookTitle: formData.BookTitle,
        AuthorBy: formData.AuthorBy,
        BookPrice: parseFloat(formData.BookPrice),
        ImageURL: formData.ImageURL,
        IsBookActive: formData.IsBookActive === 'true',
        IsOutOfStock: formData.IsOutOfStock === 'true',
        BookDescription: formData.BookDescription,
        CategoryID: formData.CategoryID,
        PublishDate: new Date(formData.PublishDate),
      });
    });
  });
  describe('updateActiveStatus', () => {
    it('should update the active status of a book', async () => {
      // Arrange
      const BookID = '1';
      const IsBookActive = false;
      const expectedBook = {
        BookID: '1',
        BookTitle: 'Test Book',
        AuthorBy: 'John Doe',
        BookPrice: 20,
        ImageURL: 'http://example.com/test.jpg',
        IsBookActive: false,
        IsOutOfStock: false,
        BookDescription: 'This is a test book',
        CategoryID: '1',
        PublishDate: '2021-09-01T00:00:00.000Z',
      };
      mockBooksRepository.updateActiveStatus.mockResolvedValue(expectedBook);

      // Act
      const result = await service.updateActiveStatus(BookID, IsBookActive);

      // Assert
      expect(result).toEqual(expectedBook);
      expect(mockBooksRepository.updateActiveStatus).toHaveBeenCalledWith(
        BookID,
        IsBookActive,
      );
    });
  });

  describe('getBookById', () => {
    it('should return a book by id', async () => {
      // Arrange
      const BookID = '1';
      const expectedBook = {
        BookID: '1',
        BookTitle: 'Test Book',
        AuthorBy: 'John Doe',
        BookPrice: 20,
        ImageURL: 'http://example.com/test.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is a test book',
        CategoryID: '1',
        PublishDate: '2021-09-01T00:00:00.000Z',
      };
      mockBooksRepository.getBookById.mockResolvedValue(expectedBook);

      // Act
      const result = await service.getBookById(BookID);

      // Assert
      expect(result).toEqual(expectedBook);
      expect(mockBooksRepository.getBookById).toHaveBeenCalledWith(BookID);
    });
  });
  describe('updateBook', () => {
    it('should update a book', async () => {
      // Arrange
      const formData = {
        BookID: '1',
        BookTitle: 'Updated Test Book',
        AuthorBy: 'John Doe',
        BookPrice: 25,
        ImageURL: 'http://example.com/test.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is an updated test book',
        CategoryID: '1',
        PublishDate: '2021-09-01T00:00:00.000Z',
      };
      const expectedBook = {
        ...formData,
        BookPrice: formData.BookPrice,
        PublishDate: new Date(formData.PublishDate),
      };
      mockBooksRepository.updateBook.mockResolvedValue(expectedBook);

      // Act
      const result = await service.updateBook(formData, null);

      // Assert
      expect(result).toEqual(expectedBook);
      expect(mockBooksRepository.updateBook).toHaveBeenCalledWith(formData);
    });
  });
  describe('countAll', () => {
    it('should return the total count of books', async () => {
      // Arrange
      const expectedCount = 10;
      mockBooksRepository.countAll.mockResolvedValue(expectedCount);

      // Act
      const result = await service.countAll();

      // Assert
      expect(result).toEqual(expectedCount);
      expect(mockBooksRepository.countAll).toHaveBeenCalled();
    });
  });
  describe('updateRating', () => {
    it('should update the rating of a book', async () => {
      // Arrange
      const BookID = '1';
      const rating = 4.5;
      const expectedBook = {
        BookID: '1',
        BookTitle: 'Test Book',
        AuthorBy: 'John Doe',
        BookPrice: 20,
        ImageURL: 'http://example.com/test.jpg',
        IsBookActive: true,
        IsOutOfStock: false,
        BookDescription: 'This is a test book',
        CategoryID: '1',
        PublishDate: '2021-09-01T00:00:00.000Z',
        Rating: rating,
      };
      mockBooksRepository.updateRating.mockResolvedValue(expectedBook);

      // Act
      const result = await service.updateRating(BookID, rating);

      // Assert
      expect(result).toEqual(expectedBook);
      expect(mockBooksRepository.updateRating).toHaveBeenCalledWith(
        BookID,
        rating,
      );
    });
  });
  describe('getOnSaleBooks', () => {
    it('should return a list of on sale books', async () => {
      // Arrange
      const size = 2;
      const expectedBooks = [
        {
          BookID: '1',
          BookTitle: 'Test Book 1',
          AuthorBy: 'John Doe',
          BookPrice: 20,
          ImageURL: 'http://example.com/test1.jpg',
          IsBookActive: true,
          IsOutOfStock: false,
          BookDescription: 'This is a test book 1',
          CategoryID: '1',
          PublishDate: '2021-09-01T00:00:00.000Z',
        },
        {
          BookID: '2',
          BookTitle: 'Test Book 2',
          AuthorBy: 'Jane Doe',
          BookPrice: 25,
          ImageURL: 'http://example.com/test2.jpg',
          IsBookActive: true,
          IsOutOfStock: false,
          BookDescription: 'This is a test book 2',
          CategoryID: '2',
          PublishDate: '2021-09-01T00:00:00.000Z',
        },
      ];
      mockBooksRepository.getOnSaleBooks.mockResolvedValue(expectedBooks);

      // Act
      const result = await service.getOnSaleBooks(size);

      // Assert
      expect(result).toEqual(expectedBooks);
      expect(mockBooksRepository.getOnSaleBooks).toHaveBeenCalledWith([
        expectedBooks[0].BookID,
        expectedBooks[1].BookID,
      ]);
    });
  });
  describe('getRecommendedBooks', () => {
    it('should return recommended books', async () => {
      // Arrange
      const size = 5;
      const expectedBooks = [
        {
          BookID: '1',
          BookTitle: 'Recommended Book 1',
          AuthorBy: 'John Doe',
          BookPrice: 20,
          ImageURL: 'http://example.com/test1.jpg',
          IsBookActive: true,
          IsOutOfStock: false,
          BookDescription: 'This is a recommended book 1',
          CategoryID: '1',
          PublishDate: '2021-09-01T00:00:00.000Z',
        },
        // ... add more books as needed
      ];
      mockBooksRepository.getRecommendedBooks.mockResolvedValue(expectedBooks);

      // Act
      const result = await service.getRecommendedBooks(size);

      // Assert
      expect(result).toEqual(expectedBooks);
      expect(mockBooksRepository.getRecommendedBooks).toHaveBeenCalledWith(
        size,
      );
    });
  });
});
