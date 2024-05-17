import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { RegisterRequestDto } from './users.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: RegisterRequestDto) {
    return this.usersService.createUser(data);
  }

  // Add more queries and mutations related to users here
}
