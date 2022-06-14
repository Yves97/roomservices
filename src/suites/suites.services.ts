import { Injectable, NotFoundException } from '@nestjs/common';
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

    async getSuite(id:number):Promise<Suites>{
        const suite = await this.suitesRepository.findOne(id)
        if(!suite){
            throw new NotFoundException('Chambre inexistante')
        }
        return suite;
        
    }

    async createSuite(suitesDto: CreateSuitesDto,ranking : SuitesRanking,file: any):Promise<Suites>{
        const suites = new Suites()
        suites.name = suitesDto.name
        suites.description = suitesDto.description
        suites.price = suitesDto.price
        suites.ranking = ranking
        suites.image = file ? file.filename : ''

        const create = this.suitesRepository.create(suites)
        await this.suitesRepository.save(suites)
        return create;
    }

    async updateSuite(id:number,suitesDto:CreateSuitesDto,ranking :SuitesRanking,file:any){
        const suite = await this.suitesRepository.findOne(id)
        if(!suite){
            throw new NotFoundException('Chambre introuvable')
        }
        const suites = new Suites()
        suites.name = suitesDto.name
        suites.description = suitesDto.description
        suites.price = suitesDto.price
        suites.ranking = ranking
        suites.image = file ? file.filename : ''
        await this.suitesRepository.update({id},suites)
        return suite
        
    }

    async deleteSuite(id : number){
        const suite = await this.suitesRepository.findOne(id)
        if(!suite){
            throw new NotFoundException('Chambre introuvable')
        }else{
            return await this.suitesRepository.delete(id)
        }
    }   
}