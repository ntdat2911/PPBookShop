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
  @Query(() => UserEntity)
  async user() {
    const result: UserEntity = {
      UserID: '123',
      Email: 'ava',
      Password: 'av',
      UserName: 'av',
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
      ImageURL: 'av',
      Name: 'abva',
      IsUserActive: true,
      IsEmailConfirmed: true,
    };
    return result;
  }
}
