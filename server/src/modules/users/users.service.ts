import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';

import { RegisterRequestDto } from './dtos/users.dto';
import { CommonService } from '../common/common.service';
import { UserEntity } from './entities/user.entity';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '../../database/prisma.service';
import { isNull, isUndefined } from '../common/consts/validation.util';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ChangeEmailDto } from './dtos/change-email.dto';
import { PasswordDto } from './dtos/password.dto';
import { isString } from 'class-validator';
import { SLUG_REGEX } from '../common/consts/regex.const';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly commonService: CommonService,
    private readonly prismaService: PrismaService,
  ) {}

  public async findOneById(UserID: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { UserID: UserID },
    });
    if (isNull(user) || isUndefined(user)) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async findOneByUsername(
    username: string,
    forAuth = false,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { UserName: username.toLowerCase() },
    });

    if (forAuth) {
      this.throwUnauthorizedException(user);
    } else {
      if (isNull(user) || isUndefined(user)) {
        throw new NotFoundException('User not found');
      }
    }

    return user;
  }

  public async findOneByIdOrUsername(
    idOrUsername: string,
  ): Promise<UserEntity> {
    if (idOrUsername && isString(idOrUsername)) {
      return this.findOneById(idOrUsername);
    }

    if (
      idOrUsername.length < 3 ||
      idOrUsername.length > 106 ||
      !SLUG_REGEX.test(idOrUsername)
    ) {
      throw new BadRequestException('Invalid username');
    }

    return this.findOneByUsername(idOrUsername);
  }

  public async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { Email: email.toLowerCase() },
    });
    this.throwUnauthorizedException(user);
    return user;
  }

  public async uncheckedUserByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: { Email: email.toLowerCase() },
    });
  }

  private throwUnauthorizedException(
    user: undefined | null | UserEntity,
  ): void {
    if (isUndefined(user) || isNull(user)) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const formattedEmail = email.toLowerCase();
    await this.checkEmailUniqueness(formattedEmail);
    const formattedName = this.commonService.formatName(name);
    const user = this.usersRepository.create({
      email: formattedEmail,
      name: formattedName,
      username: await this.generateUsername(formattedName),
      password: await hash(password, 10),
    });
    return user;
  }

  public async update(userId: string, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOneById(userId);
    const { name, username } = dto;

    if (!isUndefined(name) && !isNull(name)) {
      if (name === user.Name) {
        throw new BadRequestException('Name must be different');
      }

      user.Name = this.commonService.formatName(name);
    }
    if (!isUndefined(username) && !isNull(username)) {
      const formattedUsername = dto.username.toLowerCase();

      if (user.UserName === formattedUsername) {
        throw new BadRequestException('Username should be different');
      }

      await this.checkUsernameUniqueness(formattedUsername);
      user.UserName = formattedUsername;
    }

    await this.usersRepository.update({
      where: { UserID: userId },
      data: user,
    });
    return user;
  }

  public async delete(userId: string, dto: PasswordDto): Promise<UserEntity> {
    const user = await this.findOneById(userId);

    if (!(await compare(dto.password, user.Password))) {
      throw new BadRequestException('Wrong password');
    }

    await this.deactivate(userId);
    return user;
  }

  public async updateEmail(
    userId: string,
    dto: ChangeEmailDto,
  ): Promise<UserEntity> {
    const user = await this.findOneById(userId);
    const { email, password } = dto;

    if (!(await compare(password, user.Password))) {
      throw new BadRequestException('Invalid password');
    }

    const formattedEmail = email.toLowerCase();
    await this.checkEmailUniqueness(formattedEmail);

    user.Email = formattedEmail;

    await this.usersRepository.update({
      where: { UserID: userId },
      data: user,
    });
    return user;
  }

  public async updatePassword(
    userId: string,
    password: string,
    newPassword: string,
  ): Promise<UserEntity> {
    const user = await this.findOneById(userId);

    if (!(await compare(password, user.Password))) {
      throw new BadRequestException('Wrong password');
    }
    if (await compare(newPassword, user.Password)) {
      throw new BadRequestException('New password must be different');
    }

    user.Password = await hash(newPassword, 10);

    await this.usersRepository.update({
      where: { UserID: userId },
      data: user,
    });
    return user;
  }

  public async resetPassword(
    userId: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.findOneById(userId);

    user.Password = await hash(password, 10);

    await this.usersRepository.update({
      where: { UserID: userId },
      data: user,
    });
    return user;
  }

  public async deactivate(userId: string): Promise<UserEntity> {
    const user = await this.findOneById(userId);
    await this.prismaService.user.update({
      where: { UserID: userId },
      data: { IsUserActive: false },
    });
    return user;
  }

  public async confirmEmail(userId: string): Promise<UserEntity> {
    const user = await this.findOneById(userId);

    if (user.IsEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }

    user.IsEmailConfirmed = true;
    await this.usersRepository.update({
      where: { UserID: userId },
      data: user,
    });
    return user;
  }

  private async checkUsernameUniqueness(username: string): Promise<void> {
    const count = await this.usersRepository.count({
      where: { UserName: username },
    });

    if (count > 0) {
      throw new ConflictException('Username already in use');
    }
  }

  private async checkEmailUniqueness(email: string): Promise<void> {
    const count = await this.usersRepository.count({ where: { Email: email } });

    if (count > 0) {
      throw new ConflictException('Email already in use');
    }
  }

  private async generateUsername(name: string): Promise<string> {
    const pointSlug = this.commonService.generatePointSlug(name);
    const count = await this.usersRepository.count({
      where: {
        UserName: {
          startsWith: pointSlug,
        },
      },
    });

    if (count > 0) {
      return `${pointSlug}${count}`;
    }

    return pointSlug;
  }

  public async updateImage(userId: string, image: string): Promise<UserEntity> {
    return this.usersRepository.updateImage(userId, image);
  }

  public async updateProfile(
    userId: string,
    name: string,
  ): Promise<UserEntity> {
    return this.usersRepository.updateProfile(userId, name);
  }
}
