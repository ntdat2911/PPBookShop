import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { Public } from '../auth/decorators/public.decorator';
import { IResponseUser } from './interfaces/response-user.interface';
import { GetUserParams } from './dtos/get-user.params';
import { ResponseUserMapper } from './mappers/response-user.mapper';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ChangeEmailDto } from './dtos/change-email.dto';
import { IAuthResponseUser } from '../auth/interfaces/auth-response-user.interface';
import { AuthResponseUserMapper } from '../auth/mappers/auth-response-user.mapper';
import { UpdateUserDto } from './dtos/update-user.dto';
@Controller('api/users')
export class UsersController {
  private cookiePath = '/api/auth';
  private cookieName: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.cookieName = this.configService.get<string>('COOKIE_NAME');
  }

  @Public()
  @Get('/:idOrUsername')
  public async getUser(@Param() params: GetUserParams): Promise<IResponseUser> {
    const user = await this.usersService.findOneByIdOrUsername(
      params.idOrUsername,
    );
    return ResponseUserMapper.map(user);
  }

  @Patch('/email')
  public async updateEmail(
    @CurrentUser() id: string,
    @Body() dto: ChangeEmailDto,
  ): Promise<IAuthResponseUser> {
    const user = await this.usersService.updateEmail(id, dto);
    return AuthResponseUserMapper.map(user);
  }

  @Patch()
  public async updateUser(
    @CurrentUser() id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<IResponseUser> {
    const user = await this.usersService.update(id, dto);
    return ResponseUserMapper.map(user);
  }

  @Put('/update-image')
  public async updateImage(@CurrentUser() id1: string, @Body() body: any) {
    const { id: UserID, image } = body;
    const user = await this.usersService.updateImage(UserID, image);
    return ResponseUserMapper.map(user);
  }

  @Put('/update-profile')
  public async updateProfile(@CurrentUser() id1: string, @Body() body: any) {
    const { id, email, name } = body;
    const user = await this.usersService.updateProfile(id, name);
    return ResponseUserMapper.map(user);
  }
}
