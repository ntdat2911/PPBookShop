import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { create } from 'express-handlebars';
import { hasPagination, next, pagy, previous } from 'src/app.helper';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser(configService.get<string>('COOKIE_SECRET')));
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
            '*',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );
  app.enableCors({
    credentials: true,
    origin: `http://${configService.get<string>('domain')}`,
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Setup Handlebars view engine with helpers
  const hbs = create({
    extname: 'hbs',
    layoutsDir: join(__dirname, '..', 'views', '/'),
    partialsDir: join(__dirname, '..', 'views', 'partials'),
    defaultLayout: 'layout',
    helpers: {
      equal: (a: any, b: any) => {
        return a == b;
      },
      formatDate: (date: string) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        let hours = '' + d.getHours();
        let minutes = '' + d.getMinutes();
        let seconds = '' + d.getSeconds();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hours.length < 2) hours = '0' + hours;
        if (minutes.length < 2) minutes = '0' + minutes;
        if (seconds.length < 2) seconds = '0' + seconds;

        return (
          [year, month, day].join('-') +
          ' ' +
          [hours, minutes, seconds].join(':')
        );
      },
      categoryExists: (parentCategoryID: any, categoryList: any) => {
        if (parentCategoryID === null) return false;
        const category = categoryList.find(
          (category: any) => category.CategoryID === parentCategoryID,
        );
        return category !== undefined;
      },
      getCategoryName: (categoryID: any, categoryList: any) => {
        const category = categoryList.find(
          (category: any) => category.CategoryID === categoryID,
        );
        return category.CategoryName;
      },
      getBookTitle: (bookID: any, bookList: any) => {
        const book = bookList.find((book: any) => book.BookID === bookID);
        return book.BookTitle;
      },
      statusColor: (status: any) => {
        if (status === 'PENDING') return 'bg-blue-600';
        if (status === 'PAID') return 'bg-green-600';
        if (status === 'CANCELLED') return 'bg-red-600';
        if (status === 'SHIPPING') return 'bg-yellow-600';
        if (status === 'COMPLETED') return 'bg-purple-600';
        return 'bg-gray-600';
      },
      renderButtonPagy: pagy,
      hasPagination: hasPagination,
      previous: previous,
      next: next,
    },
  });
  app.engine('hbs', hbs.engine);
  app.setViewEngine('hbs');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(configService.get<number>('port'));
}
bootstrap();
