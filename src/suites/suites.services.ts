import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSuitesDto } from './dto/create-suites.dto';
import { Suites } from './suites.entity';
import { SuitesRanking } from './suites.ranking.enum';
import {SuitesRepository} from './suites.repository'


@Injectable()
export class SuitesServices {
    constructor(
        @InjectRepository(SuitesRepository)
        private suitesRepository : SuitesRepository
    ){}

    getSuites():Promise<Suites[]>{
        return this.suitesRepository.find()
    }

    getSuite(id:number):Promise<Suites>{
        return this.suitesRepository.findOne(id)
    }

    async createSuite(suitesDto: CreateSuitesDto,file: any):Promise<Suites>{
        const suites = new Suites()
        suites.name = suitesDto.name
        suites.price = suitesDto.price
        suites.ranking = SuitesRanking.ECONOMIC
        suites.image = file ? file.filename : ''

        const create = this.suitesRepository.create(suites)
        await this.suitesRepository.save(suites)
        return create;

    }

    
}