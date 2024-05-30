import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Public } from '../auth/decorators/public.decorator';
import multer from 'multer';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Post('/create')
  @UseInterceptors(NoFilesInterceptor())
  async createCategory(@Body() formData: any) {
    return await this.categoriesService.createCategory(formData);
  }

  @Public()
  @Post('/update-active-status')
  async updateActiveStatus(@Body() body: any) {
    return await this.categoriesService.updateActiveStatus(
      body.CategoryID,
      body.IsCategoryActive,
    );
  }

  @Public()
  @Put('/update/:CategoryID')
  @UseInterceptors(NoFilesInterceptor())
  async updateCategory(@Param() req: any, @Body() formData: any) {
    return await this.categoriesService.updateCategory(
      req.CategoryID,
      formData,
    );
  }
}
