import { IResponseUser } from '../interfaces/response-user.interface';
import { IUser } from '../interfaces/user.interface';

export class ResponseUserMapper implements IResponseUser {
  public id: string;
  public name: string;
  public image: string;
  public username: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(values: IResponseUser) {
    Object.assign(this, values);
  }

  public static map(user: IUser): ResponseUserMapper {
    return new ResponseUserMapper({
      id: user.UserID,
      name: user.Name,
      username: user.UserName,
      createdAt: user.CreatedAt.toISOString(),
      updatedAt: user.UpdatedAt.toISOString(),
      image: user.ImageURL,
    });
  }
}
