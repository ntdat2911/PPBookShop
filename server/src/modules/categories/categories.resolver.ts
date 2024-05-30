import { Args, Query, Resolver } from '@nestjs/graphql';

import { Public } from '../auth/decorators/public.decorator';
import { CategoryEntity } from './entities/category.entity';
import { CategoriesService } from './categories.service';

@Resolver(() => CategoryEntity)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Query(() => [CategoryEntity])
  async getCategories() {
    return this.categoriesService.getCategories();
  }
}
