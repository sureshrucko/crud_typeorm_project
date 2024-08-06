import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()  // Ensures the value is a valid email address
    emailId: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UpdateUserDto {
    @IsNotEmpty()
    @IsEmail()  // Ensures the value is a valid email address
    emailId: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UserProfileDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsString()
    dob: string;
}

export class UserPostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}