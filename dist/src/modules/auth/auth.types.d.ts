export declare class LoginDto {
    email: string;
    password: string;
}
export type AuthPayload = {
    sub: string;
};
export type IAuthUser = {
    sub: string;
    role: string;
};
export declare class SignupDto {
    name: string;
    email: string;
    password: string;
}
