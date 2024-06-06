import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsController } from './about-us.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { AboutUsRepository } from './about-us.repository';
import { AboutUsResolver } from './about-us.resolver';

@Module({
  imports: [PrismaModule],
  providers: [AboutUsService, AboutUsRepository, AboutUsResolver],
  exports: [AboutUsService],
  controllers: [AboutUsController],
})
export class AboutUsModule {}
