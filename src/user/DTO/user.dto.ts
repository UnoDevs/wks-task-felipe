import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDTO {
    name: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
    funct: string;
    isActive: boolean;
}