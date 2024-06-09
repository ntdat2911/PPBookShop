import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private readonly prismService: PrismaService) {}

  async findOne(params: {
    where: Prisma.AdminWhereInput;
  }): Promise<Admin | null> {
    const { where } = params;
    return await this.prismService.admin.findFirst({ where });
  }
}
