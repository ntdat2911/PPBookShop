import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Prisma, User } from '@prisma/client';
import { RegisterRequestDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async getUsers() {
    const users = await this.repository.getUsers();
    console.log('Service', users);
    return users;
  }

  async getUser(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User | null> {
    return this.repository.getUser(params);
  }

  async createUser(data: RegisterRequestDto) {
    const { Password, ...response } = await this.repository.createUser(data);
    console.log('Service', response);
    return response;
  }
}
