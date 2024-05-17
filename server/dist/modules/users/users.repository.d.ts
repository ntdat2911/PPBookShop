import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { RegisterRequestDto } from './users.dto';
export declare class UsersRepository {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: RegisterRequestDto): Promise<{
        UserID: number;
        ImageURL: string;
        UserName: string;
        Password: string;
        Email: string;
        IsUserActive: boolean;
        CreatedAt: Date;
        UpdatedAt: Date;
    }>;
    getUser(params: {
        where: Prisma.UserWhereUniqueInput;
    }): Promise<User | null>;
    getUsers(): Promise<{
        UserID: number;
        ImageURL: string;
        UserName: string;
        Password: string;
        Email: string;
        IsUserActive: boolean;
        CreatedAt: Date;
        UpdatedAt: Date;
    }[]>;
    updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User>;
    deleteUser(params: {
        where: Prisma.UserWhereUniqueInput;
    }): Promise<User>;
}
