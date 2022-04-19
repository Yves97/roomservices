import { IsInt, IsNotEmpty } from "class-validator";
import { SuitesRanking } from "../suites.ranking.enum";

export class CreateSuitesDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsInt()
    price : number;

    @IsNotEmpty()
    ranking : SuitesRanking;

    @IsNotEmpty()
    image : string;

}