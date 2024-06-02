export interface SignInRequestDto {
  emailOrUsername: string;
  password: string;
}

export interface SignUpRequestDto {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

export interface UserDto {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
}
