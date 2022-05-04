import { BadRequestException, PipeTransform } from "@nestjs/common";
import { SuitesRanking } from "src/suites/suites.ranking.enum";


export class ReservationSuitesRankingValidationPipe implements PipeTransform {
    readonly allowedRanking = [
        SuitesRanking.ECONOMIC,
        SuitesRanking.MEDIUM,
        SuitesRanking.BUSINESS
    ]
  

    transform(value: any) {
        value = value.toUpperCase()
        if(!this.isValidRanking(value)){
            
            throw new BadRequestException(`${value} est une classe invalide`)
        }
        return value
    }

    private isValidRanking(ranking : any){
        const idx = this.allowedRanking.indexOf(ranking)
        return idx !== -1
    }
}