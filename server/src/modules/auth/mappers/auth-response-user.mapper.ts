import { IUser } from '../../users/interfaces/user.interface';
import { IAuthResponseUser } from '../interfaces/auth-response-user.interface';

export class AuthResponseUserMapper implements IAuthResponseUser {
  public id: string;
  public name: string;
  public username: string;
  public email: string;
  public createdAt: string;
  public updatedAt: string;
  public image?: string;

  constructor(values: IAuthResponseUser) {
    Object.assign(this, values);
  }

  public static map(user: IUser): AuthResponseUserMapper {
    return new AuthResponseUserMapper({
      id: user.UserID,
      name: user.Name,
      username: user.UserName,
      email: user.Email,
      image: user.ImageURL,
      createdAt: user.CreatedAt.toISOString(),
      updatedAt: user.UpdatedAt.toISOString(),
    });
  }
}
