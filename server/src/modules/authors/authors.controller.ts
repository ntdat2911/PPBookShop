import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Public } from '../auth/decorators/public.decorator';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('api/authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Public()
  @Post('/create')
  @UseInterceptors(NoFilesInterceptor())
  async createAuthor(@Body() formData: any) {
    return await this.authorService.createAuthor(formData);
  }

  @Public()
  @Put('/update/:AuthorID')
  @UseInterceptors(NoFilesInterceptor())
  async updateAuthor(@Param() req: any, @Body() formData: any) {
    return await this.authorService.updateAuthor(req.AuthorID, formData);
  }
}
