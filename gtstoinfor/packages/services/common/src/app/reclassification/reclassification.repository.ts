import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ReclassificationEntity } from "./reclassification.entity";


@Injectable()
export class ReclassificationRepo extends Repository<ReclassificationEntity> {
    
}