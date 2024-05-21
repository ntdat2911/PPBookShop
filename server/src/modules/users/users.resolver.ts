import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';

import { RegisterRequestDto } from './dtos/users.dto';
import { UserEntity } from './entities/user.entity';
import { User } from '@prisma/client';
import { Public } from '../auth/decorators/public.decorator';
@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Query(() => String)
  async user() {
    return 'this.usersService.getUserById(id)';
  }
}
