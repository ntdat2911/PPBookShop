import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { PrismaModule } from 'src/database/prisma.module';
import { AddressesRepository } from './addresses.repository';
import { AddressesResolver } from './addresses.resolver';

@Module({
  imports: [PrismaModule],
  providers: [AddressesService, AddressesRepository, AddressesResolver],
  exports: [AddressesService],
})
export class AddressesModule {}
