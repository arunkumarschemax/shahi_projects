import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SampleRequestProcessInfoEntity } from "../entities/sample-request-process-info-entity";

@Injectable()
export class SampleProcessRepo extends Repository<SampleRequestProcessInfoEntity> {
    constructor(@InjectRepository(SampleRequestProcessInfoEntity) 
    private repo: Repository<SampleRequestProcessInfoEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }
   
}