import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/auth.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { SuitesRanking } from 'src/suites/suites.ranking.enum';
import { CreateReservationsDto } from './dto/create-reservations.dto';
import { ReservationSuitesRankingValidationPipe } from './pipes/reservations-suites-ranking-validation.pipe';
import { Reservations } from './reservations.entity';
import { ReservationsServices } from './reservations.services';

@Controller('reservations')
@UseGuards(AuthGuard())
export class ReservationsController {
    constructor(
        private reservationsServices : ReservationsServices
    ){}


    @Post()
    async createReservation(@Body(ValidationPipe) createReservationDto : CreateReservationsDto, @Body('ranking',ReservationSuitesRankingValidationPipe) ranking : SuitesRanking, @GetUser() user: Auth):Promise<Reservations>{
        // console.log('user=',user)
        return await this.reservationsServices.createReservation(createReservationDto,user,ranking)
    }
}
