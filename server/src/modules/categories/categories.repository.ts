import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async createCategory(data: {
    CategoryName: string;
    ParentCategoryID: string;
    IsCategoryActive: boolean;
  }) {
    return this.prisma.category.create({
      data,
    });
  }

  async getCategories() {
    return this.prisma.category.findMany();
  }

  async getCategoryById(id: string) {
    return this.prisma.category.findUnique({
      where: {
        CategoryID: id,
      },
    });
  }

  async updateCategory(
    id: string,
    data: { CategoryName: string; ParentCategoryID: string },
  ) {
    return this.prisma.category.update({
      where: {
        CategoryID: id,
      },
      data,
    });
  }

  async getCategoriesByParentId(id: string) {
    return this.prisma.category.findMany({
      where: {
        ParentCategoryID: id,
      },
    });
  }
}
