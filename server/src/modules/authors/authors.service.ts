import { Injectable } from '@nestjs/common';
import { AuthorsRepository } from './authors.repository';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(
    private authorsRepository: AuthorsRepository,
    private readonly prismaService: PrismaService,
  ) {}

  public async getAuthors() {
    return await this.authorsRepository.getAuthors();
  }

  public async getAuthorById(id: string) {
    return this.authorsRepository.getAuthorById(id);
  }

  public async createAuthor(data: { AuthorName: string; Bio: string }) {
    return this.authorsRepository.createAuthor(data);
  }

  public async updateAuthor(
    id: string,
    data: { AuthorName: string; Bio: string },
  ) {
    return this.authorsRepository.updateAuthor(id, data);
  }

  public async getPaginationAuthors(page: number, size: number) {
    return this.authorsRepository.getPaginationAuthors(page, size);
  }

  public async countAll() {
    return this.authorsRepository.countAll();
  }
}
