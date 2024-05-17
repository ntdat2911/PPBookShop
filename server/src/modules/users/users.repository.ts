import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { RegisterRequestDto } from './users.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: RegisterRequestDto) {
    const user: Prisma.UserCreateInput = {
      UserName: data.UserName,
      Password: data.Password,
      Email: data.Email,
      IsUserActive: true,
    };

    return await this.prisma.user.create({ data: user });
  }

  async getUser(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User | null> {
    const { where } = params;
    return await this.prisma.user.findUnique({ where });
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return await this.prisma.user.update({ where, data });
  }

  async deleteUser(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User> {
    const { where } = params;
    return await this.prisma.user.delete({ where });
  }
}
