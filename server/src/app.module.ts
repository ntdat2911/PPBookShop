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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CommonModule,
    JwtModule,
    MailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
