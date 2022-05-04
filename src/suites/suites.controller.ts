import { BadRequestException, Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ReservationSuitesRankingValidationPipe } from 'src/reservations/pipes/reservations-suites-ranking-validation.pipe';
import { CreateSuitesDto } from './dto/create-suites.dto';
import { Suites } from './suites.entity';
import { SuitesRanking } from './suites.ranking.enum';
import { SuitesServices } from './suites.services';

@Controller('suites')
export class SuitesController {
    constructor(private suitesServices : SuitesServices){}


    @Get()
    async getSuites():Promise<Suites[]>{
        const suites = await this.suitesServices.getSuites()
        return suites;
    }

    @Get(':id')
    async getSuite(@Param('id') id:number):Promise<Suites>{
        const suite = await this.suitesServices.getSuite(id)
        return suite;
    }

   @Post()
   @UseInterceptors(FileInterceptor('image',{
    storage : diskStorage({
        destination : './files',
        filename : (req,file,cb) => {
            const name = file.originalname.split('.')[0]
            const fileExtension = file.originalname.split('.')[1]
            const newFileName = name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension

            cb(null,newFileName)
        },
    }),
    fileFilter : (req,file,cb) => {
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
                return cb(null,false)
            }
            cb(null,true)
        }
    }))
    async createSuite(@Body(ValidationPipe) suitesDto:CreateSuitesDto,@Body('ranking',ReservationSuitesRankingValidationPipe) ranking : SuitesRanking, @UploadedFile() image : Express.Multer.File):Promise<Suites>{
        if(!image){
            throw new BadRequestException("Veuillez choisir une image")
        }
        const suite = await this.suitesServices.createSuite(suitesDto,ranking,image)
        return suite;
    }

    @Get('pictures/:filepath')
    async getPhoto(@Param('filepath') image,@Res() res){
        return res.sendFile(image,{root : './files'})
    }

    





}
