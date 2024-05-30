import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { PrismaModule } from 'src/database/prisma.module';
import { AuthorsRepository } from './authors.repository';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsController } from './authors.controller';

@Module({
  imports: [PrismaModule],
  providers: [AuthorsService, AuthorsRepository, AuthorsResolver],
  exports: [AuthorsService],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
