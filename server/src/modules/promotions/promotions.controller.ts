import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { Public } from '../auth/decorators/public.decorator';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('api/promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Public()
  @Post('/create')
  @UseInterceptors(NoFilesInterceptor())
  async create(
    @Body()
    formData: {
      PromotionName: string;
      DiscountPercent: number;
      IsAvailable: boolean;
      ExpiredDate: Date;
      SelectedBooks: string;
    },
  ) {
    return await this.promotionsService.create(formData);
  }

  @Public()
  @Put('/update/:PromotionID')
  @UseInterceptors(NoFilesInterceptor())
  async update(@Body() formData: any) {
    const { PromotionID, ...data } = formData;
    return await this.promotionsService.update(PromotionID, data);
  }

  @Public()
  @Delete('/:PromotionID')
  async delete(PromotionID: string) {
    return await this.promotionsService.delete(PromotionID);
  }
}
