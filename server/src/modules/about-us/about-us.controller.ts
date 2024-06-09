import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { Public } from '../auth/decorators/public.decorator';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('api/about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Public()
  @Post('/create/:id')
  async writeAboutUs(
    @Param('id') id: number,
    @Body() body: { content: string },
  ) {
    return await this.aboutUsService.writeAboutUs(id, body.content);
  }
}
