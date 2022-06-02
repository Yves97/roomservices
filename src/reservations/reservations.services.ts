import { ConflictException, Injectable, InternalServerErrorException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "src/auth/auth.entity";
import { Suites } from "src/suites/suites.entity";
import { SuitesRanking } from "src/suites/suites.ranking.enum";
import { CreateReservationsDto } from "./dto/create-reservations.dto";
import { Reservations } from "./reservations.entity";
import { ReservationRepository } from "./reservations.repository";


@Injectable()

export class ReservationsServices {
    constructor(
        @InjectRepository(ReservationRepository)
        private reservationRepository : ReservationRepository
    ){}


    async createReservation(createReservationDto : CreateReservationsDto,user : Auth,ranking : SuitesRanking):Promise<Reservations>{
        const reserve = new Reservations()
       
        reserve.duration = createReservationDto.duration
        reserve.user = user.id
        reserve.suite = createReservationDto.suiteId
        reserve.ranking = ranking

        const create = this.reservationRepository.create(reserve)

        try {
            return await this.reservationRepository.save(reserve)
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY') throw new ConflictException("Cette chambre à déjà été prise")
            throw new InternalServerErrorException()
        }       
    }   

}