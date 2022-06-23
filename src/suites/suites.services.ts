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

    async getSuites():Promise<Suites[]>{
        return await this.suitesRepository.find()
    }

    async getOpenedSuites():Promise<Suites[]>{
        const suites = await this.suitesRepository
                                .createQueryBuilder('suites')
                                .where('suites.status = :status',{status : 1})
                                .getMany()
        return suites
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
        suites.status = suitesDto.status

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

    async updateSuiteStatus(id:number,status:string):Promise<{}>{
        const suite = await this.suitesRepository.findOne(id)
        if(!suite){
            throw new NotFoundException('Chambre introuvable')
        }
        // const update = this.suitesRepository
        //                 .createQueryBuilder('suite')
        //                 .update(Suites)
        //                 .set({status})
        //                 .where("suites.id = :id",{id : suite.id})
        //                 .execute()
        const update = await this.suitesRepository.update(id,{status})
        return update
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