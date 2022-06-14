import { Body, Controller, Post, UseGuards, ValidationPipe,Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/auth.entity';
import { AuthRole } from 'src/auth/auth.roles.enum';
import { AuthServices } from 'src/auth/auth.services';
import { GetUser } from 'src/auth/get-user.decorator';
import { Roles, RolesGuard } from 'src/auth/roles.guards';
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
    

    @Roles(AuthRole.ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    async list():Promise<Reservations[]>{
        const reservations = await this.reservationsServices.getReservations()
        return reservations
    }

    @Post()
    async createReservation(@Body(ValidationPipe) createReservationDto : CreateReservationsDto, @Body('ranking',ReservationSuitesRankingValidationPipe) ranking : SuitesRanking, @GetUser() user: Auth):Promise<Reservations>{
        return await this.reservationsServices.createReservation(createReservationDto,user,ranking)
    }

    @Roles(AuthRole.ADMIN)
    @UseGuards(RolesGuard)
    @Get('/:id')
    async details(@Param('id') id : number):Promise<Reservations>{
        return await this.reservationsServices.details(id)
    }
}
