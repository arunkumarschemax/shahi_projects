import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { QualityEntity } from "./quality.entity";


@Injectable()
export class QualityRepo extends Repository<QualityEntity> {
    
}