import { UserDto } from "@/services/auth/dto";

declare module "next-auth" {
  interface Session {
    user: UserDto;
    accessToken: string;
    accessTokenExpiresIn: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserDto;
    accessToken: string;
    accessTokenExpiresIn: number;
  }
}
