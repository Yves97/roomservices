import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { SuitesRanking } from "../suites.ranking.enum";

export class CreateSuitesDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    // @IsInt()
    price : number;

    @IsNotEmpty()
    description : string;

    // @IsNotEmpty()
    // @IsString()
    // ranking : SuitesRanking;

    // @IsNotEmpty()
    // @IsString()
    image : string;
}