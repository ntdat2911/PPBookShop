import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AboutUsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async writeAboutUs(id: number, content: string) {
    return await this.prisma.aboutUs.update({
      where: { AboutUsID: id },
      data: { Content: content },
    });
  }

  async getAboutUs() {
    return await this.prisma.aboutUs.findFirst();
  }
}
