import { IsEmail, IsNotEmpty, Max, Matches,IsString } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email : string;

    @IsNotEmpty()
    @IsString()
    phone : string;

    // Ensure string has two uppercase letters.
    // Ensure string has one special case letter.
    // Ensure string has two digits.
    // Ensure string has three lowercase letters.
    // Ensure string is of length 8.
    // End anchor.
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,{message : 'Mot de passe faible'})
    password : string;
}