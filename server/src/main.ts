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

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
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
