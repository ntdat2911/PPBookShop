import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(data: {
    CategoryName: string;
    ParentCategoryID: string;
    IsCategoryActive: boolean;
  }) {
    return this.categoriesRepository.createCategory(data);
  }

  async getCategories() {
    return this.categoriesRepository.getCategories();
  }

  async getCategoryById(id: string) {
    return this.categoriesRepository.getCategoryById(id);
  }

  async updateCategory(
    id: string,
    data: { CategoryName: string; ParentCategoryID: string },
  ) {
    return this.categoriesRepository.updateCategory(id, data);
  }
}
