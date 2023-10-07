import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SampleReqSizeEntity } from "../entities/sample-requset-size-info-entity";

@Injectable()
export class SampleSizeRepo extends Repository<SampleReqSizeEntity> {
    constructor(@InjectRepository(SampleReqSizeEntity) 
    private repo: Repository<SampleReqSizeEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }
   
}