import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Public } from '../auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { BookEntity } from './entities/book.entity';

@Controller('api/books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Public()
  @Post('/create')
  @UseInterceptors(FileInterceptor('bookCover'))
  async createBook(
    @UploadedFile() file: Express.Multer.File,
    @Body() formData: any,
  ) {
    const res = await this.cloudinaryService.uploadFile(file);
    formData.ImageURL = res.secure_url;
    return await this.booksService.createBook(formData);
  }

  @Public()
  @Post('/update-active-status')
  async updateActiveStatus(@Body() body: any) {
    return await this.booksService.updateActiveStatus(
      body.BookID,
      body.IsBookActive,
    );
  }

  //get book by id
  @Public()
  @Get('/:BookID')
  async getBookById(@Param() req: any): Promise<BookEntity> {
    //get the slug from the request
    return await this.booksService.getBookById(req.BookID);
  }

  //update book
  @Public()
  @Put('/update-book')
  async updateBook(@Body() body: any) {
    return await this.booksService.updateBook(body);
  }
}
