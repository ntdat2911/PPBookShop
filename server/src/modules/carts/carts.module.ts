import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { PrismaModule } from 'src/database/prisma.module';
import { CartsRepository } from './carts.repository';
import { CartsResolver } from './carts.resolver';

@Module({
  imports: [PrismaModule],
  providers: [CartsService, CartsRepository, CartsResolver],
  exports: [CartsService],
})
export class CartsModule {}
