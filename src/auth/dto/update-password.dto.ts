import { IsNotEmpty, IsString, Matches } from "class-validator";

export class UpdatePasswordDto {
    @IsNotEmpty()
    @IsString()
    currentPassword : string;

    @IsNotEmpty()
    @IsString()
    // @Matches(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,{message : 'Mot de passe faible'})
    newPassword : string;
}