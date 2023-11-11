import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { RacksEntity } from "./rack.entity";


@Injectable()
export class RacksRepo extends Repository<RacksEntity> {
    
}