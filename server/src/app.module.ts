import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { CommonModule } from './modules/common/common.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { GraphQLConfig } from './config/graphql.config';
import { BooksModule } from './modules/books/books.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AdminModule } from './modules/admin/admin.module';

import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useClass: GraphQLConfig,
    }),

    PrismaModule,
    UsersModule,
    AuthModule,
    CommonModule,
    JwtModule,
    MailerModule,
    BooksModule,
    AuthorsModule,
    CategoriesModule,
    ReviewsModule,
    AdminModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
