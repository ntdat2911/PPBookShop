import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '../jwt/jwt.module';
import { MailerModule } from '../mailer/mailer.module';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [UsersModule, JwtModule, MailerModule, AdminModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
