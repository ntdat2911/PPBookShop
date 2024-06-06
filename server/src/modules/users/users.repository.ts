import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { RegisterRequestDto } from './dtos/users.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(params: {
    where: Prisma.UserWhereInput;
  }): Promise<User | null> {
    const { where } = params;
    return await this.prisma.user.findFirst({ where });
  }

  async count(params: { where: Prisma.UserWhereInput }): Promise<number> {
    const { where } = params;
    return await this.prisma.user.count({ where });
  }

  async create({
    email,
    name,
    username,
    password,
  }: {
    email: string;
    name: string;
    username: string;
    password: string;
  }) {
    const user: Prisma.UserCreateInput = {
      UserName: username,
      Name: name,
      Email: email,
      Password: password,
      IsUserActive: true,
      IsEmailConfirmed: false,
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

  async update(params: {
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

  async updateImage(userId: string, image: string) {
    return await this.prisma.user.update({
      where: { UserID: userId },
      data: { ImageURL: image },
    });
  }
}
