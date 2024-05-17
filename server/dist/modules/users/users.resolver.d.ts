import { UsersService } from './users.service';
import { RegisterRequestDto } from './users.dto';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
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
