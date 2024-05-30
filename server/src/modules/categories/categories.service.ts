import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(formData: any) {
    formData.IsCategoryActive = formData.IsCategoryActive === 'true';
    return this.categoriesRepository.createCategory(formData);
  }

  async getCategories() {
    return await this.categoriesRepository.getCategories();
  }

  async getCategoryById(id: string) {
    return this.categoriesRepository.getCategoryById(id);
  }

  async updateCategory(id: string, data: any) {
    data.IsCategoryActive = data.IsCategoryActive === 'true';
    return this.categoriesRepository.updateCategory(id, data);
  }

  public async updateActiveStatus(
    CategoryID: string,
    IsCategoryActive: boolean,
  ) {
    const book = await this.categoriesRepository.updateActiveStatus(
      CategoryID,
      IsCategoryActive,
    );
    return book;
  }

  async getPaginationCategories(page: number, size: number) {
    return this.categoriesRepository.getPaginationCategories(page, size);
  }

  async countAll() {
    return this.categoriesRepository.countAll();
  }
}
