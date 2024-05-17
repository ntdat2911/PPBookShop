import { User as UserDB } from '@prisma/client';
export declare class User {
    UserID: UserDB[`UserID`];
    ImageURL: UserDB[`ImageURL`];
    UserName: UserDB[`UserName`];
    Password: UserDB[`Password`];
    Email: UserDB[`Email`];
    Role: UserDB[`Role`];
    IsUserActive: UserDB[`IsUserActive`];
    CreatedAt: UserDB[`CreatedAt`];
    UpdatedAt: UserDB[`UpdatedAt`];
}
