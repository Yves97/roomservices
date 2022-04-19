import { EntityRepository, Repository } from "typeorm";
import { Suites } from "./suites.entity";

@EntityRepository(Suites)
export class SuitesRepository extends Repository<Suites>{
    
}