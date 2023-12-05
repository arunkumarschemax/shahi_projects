import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { QualitysEntity } from "./qualitys.entity";


@Injectable()
export class QualitysRepo extends Repository<QualitysEntity> {
    
}