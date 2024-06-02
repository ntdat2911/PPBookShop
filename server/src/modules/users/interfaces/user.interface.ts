export interface IUser {
  UserID: string;
  ImageURL: string;
  Name: string;
  UserName: string;
  Password: string;
  Email: string;
  IsUserActive: boolean;
  IsEmailConfirmed: boolean;
  CreatedAt: Date;
  UpdatedAt: Date;
}
