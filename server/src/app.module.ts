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
