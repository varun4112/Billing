import { IsEmail, IsNotEmpty } from "class-validator";

export class registerDto{
    companyName: String;
    adminName: String;

    @IsEmail()
    adminEmail: String;

    @IsNotEmpty()
    password: String;

    phone: Number
}