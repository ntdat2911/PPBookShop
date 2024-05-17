export declare class RegisterRequestDto {
    UserName: string;
    Password: string;
    Email: string;
}
export declare class ErrorType {
    message: string;
    code?: string;
}
export declare class RegisterResponseDto {
    UserName: string;
    Email: string;
    error?: ErrorType;
}
