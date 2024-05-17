import { UsersRepository } from './users.repository';
import { Prisma, User } from '@prisma/client';
import { RegisterRequestDto } from './users.dto';
export declare class UsersService {
    private repository;
    constructor(repository: UsersRepository);
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
    getUser(params: {
        where: Prisma.UserWhereUniqueInput;
    }): Promise<User | null>;
    createUser(data: RegisterRequestDto): Promise<{
        UserID: number;
        ImageURL: string;
        UserName: string;
        Email: string;
        IsUserActive: boolean;
        CreatedAt: Date;
        UpdatedAt: Date;
    }>;
}
