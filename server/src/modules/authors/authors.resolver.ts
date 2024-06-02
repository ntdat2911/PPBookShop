import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthorEntity } from './entities/author.entity';
import { AuthorsService } from './authors.service';
import { Public } from '../auth/decorators/public.decorator';
import { Logger } from '@nestjs/common';

@Resolver(() => AuthorEntity)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Public()
  @Query(() => [AuthorEntity])
  async getAuthors() {
    return this.authorsService.getAuthors();
  }

  @Public()
  @Query(() => AuthorEntity)
  async getAuthorById(@Args('id') id: string) {
    return this.authorsService.getAuthorById(id);
  }
}
