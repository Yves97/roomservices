import { IsEmail, IsNotEmpty, Matches,IsString } from "class-validator";
import { AuthRole } from "../auth.roles.enum";

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

    @IsNotEmpty()
    @IsString()
    // @Matches(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,{message : 'Mot de passe faible'})
    password : string;

    // @IsNotEmpty()
    // @IsString()
    role : AuthRole
}