import { EntityRepository, Repository } from "typeorm";
import { Reservations } from "./reservations.entity";

@EntityRepository(Reservations)
export class ReservationRepository extends Repository<Reservations>{}