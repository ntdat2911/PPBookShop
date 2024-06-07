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
  let mockBooksRepository;

  beforeEach(async () => {
    mockBooksRepository = { findByFilter: jest.fn() };

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
      const result = { page: 1, size: 10, count: 0, records: [] };
      const params = {
        page: 1,
        size: 10,
      };
      mockBooksRepository.findByFilter.mockResolvedValue(result);

      expect(await service.getBooks(params)).toEqual(result);
      expect(mockBooksRepository.findByFilter).toHaveBeenCalledWith({
        page: params.page,
        size: params.size,
      });
    });
  });
});
