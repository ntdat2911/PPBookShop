import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AuthorsRepository {
  constructor(private prisma: PrismaService) {}

  async createAuthor(data: { AuthorName: string; Bio: string }) {
    return this.prisma.author.create({
      data,
    });
  }

  async getAuthors() {
    return await this.prisma.author.findMany();
  }

  async getAuthorById(id: string) {
    return this.prisma.author.findUnique({
      where: {
        AuthorID: id,
      },
    });
  }

  async updateAuthor(id: string, data: { AuthorName: string; Bio: string }) {
    return this.prisma.author.update({
      where: {
        AuthorID: id,
      },
      data,
    });
  }

  async getPaginationAuthors(page: number, size: number) {
    return this.prisma.author.findMany({
      skip: (page - 1) * size,
      take: size,
    });
  }

  async countAll() {
    return this.prisma.author.count();
  }
}
