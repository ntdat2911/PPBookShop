import { Injectable } from '@nestjs/common';
import { PromotionsRepository } from './promotions.repository';
import { PromotionEntity } from './entities/promotion.entity';

@Injectable()
export class PromotionsService {
  constructor(private readonly promotionsRepository: PromotionsRepository) {}

  async findMany() {
    return await this.promotionsRepository.findMany();
  }

  async getDetailPromotion(PromotionID: string) {
    //using promise all
    const [promotion, bookPromotionList] = await Promise.all([
      this.promotionsRepository.findOne(PromotionID),
      this.promotionsRepository.getBooksByPromotionID(PromotionID),
    ]);
    return { promotion, bookPromotionList };
  }

  async create(data: any) {
    const newPromotion = {
      PromotionName: data.PromotionName,
      DiscountPercent: parseFloat(data.DiscountPercent),
      IsAvailable: data.IsAvailable === 'true' ? true : false,
      ExpiredDate: new Date(data.ExpiredDate),
    };

    const result = await this.promotionsRepository.create(newPromotion);
    const selectedBooks = data.SelectedBooks.split(',');
    selectedBooks.forEach(async (bookID: string) => {
      await this.promotionsRepository.createBookPromotion({
        PromotionID: result.PromotionID,
        BookID: bookID,
      });
    });
    return result;
  }

  async update(PromotionID: string, data: any) {
    const updatedPromotion = {
      PromotionName: data.PromotionName,
      DiscountPercent: parseFloat(data.DiscountPercent),
      IsAvailable: data.IsAvailable === 'true' ? true : false,
      ExpiredDate: new Date(data.ExpiredDate),
    };
    const result = await this.promotionsRepository.update(
      PromotionID,
      updatedPromotion,
    );
    const bookPromotionList =
      await this.promotionsRepository.getBooksByPromotionID(PromotionID);
    const selectedBooks = data.SelectedBooks.split(',');

    const newBooks = selectedBooks.filter(
      (bookID: string) =>
        bookPromotionList.findIndex((item) => item.BookID === bookID) === -1,
    );

    const deletedBooks = bookPromotionList.filter(
      (item) => selectedBooks.indexOf(item.BookID) === -1,
    );

    newBooks.forEach(async (bookID: string) => {
      await this.promotionsRepository.createBookPromotion({
        PromotionID: PromotionID,
        BookID: bookID,
      });
    });

    deletedBooks.forEach(async (item) => {
      await this.promotionsRepository.deleteBookPromotion(item.BookPromotionID);
    });

    return result;
  }

  async delete(PromotionID: string) {
    return await this.promotionsRepository.delete(PromotionID);
  }

  async getPaginationPromotions(page: number, size: number) {
    return await this.promotionsRepository.getPaginationPromotions(page, size);
  }

  async countAll() {
    return await this.promotionsRepository.countAll();
  }

  async getPromotionByBookID(BookID: string) {
    const bookPromotion =
      await this.promotionsRepository.getPromotionListByBookID(BookID);
    if (bookPromotion.length === 0) {
      return [];
    }
    const promotionList: PromotionEntity[] = [];

    for (const promotion of bookPromotion) {
      const promotionDetail = await this.promotionsRepository.findOne(
        promotion.PromotionID,
      );
      promotionList.push(promotionDetail);
    }
    promotionList.sort((a, b) => b.DiscountPercent - a.DiscountPercent);

    return promotionList;
  }

  async updateActiveStatus(data: any) {
    const { PromotionID, IsAvailable } = data;
    return await this.promotionsRepository.updateActiveStatus({
      PromotionID,
      IsAvailable,
    });
  }

  async getOnSaleBooks(size: number) {
    const bookPromotionList: any =
      await this.promotionsRepository.getOnSaleBooks(size);

    return bookPromotionList;
  }
}
