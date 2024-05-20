import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '../jwt/jwt.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [UsersModule, JwtModule, MailerModule],
  providers: [AuthService],
})
export class AuthModule {}
