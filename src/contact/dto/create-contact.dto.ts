import { IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto {

    @IsNotEmpty()
    firstname :string;
    
    @IsNotEmpty()
    lastname : string;

    @IsNotEmpty()
    phone : string;

    @IsNotEmpty()
    message : string;

    @IsNotEmpty()
    email : string;

}