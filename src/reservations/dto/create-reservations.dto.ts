import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SuitesRanking } from "src/suites/suites.ranking.enum";

export class CreateReservationsDto {
    @IsNotEmpty()
    @IsString()
    duration:string;

    @IsNumber()
    @IsNotEmpty()
    suiteId : number;

    // @IsNotEmpty()
    // @IsString()
    // ranking : SuitesRanking
}


