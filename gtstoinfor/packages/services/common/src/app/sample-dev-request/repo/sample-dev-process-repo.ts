import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SampleRequestProcessInfoEntity } from "../entities/sample-request-process-info-entity";
import { SampleRequest } from "../entities/sample-dev-request.entity";

@Injectable()
export class SampleProcessRepo extends Repository<SampleRequestProcessInfoEntity> {
    constructor(@InjectRepository(SampleRequestProcessInfoEntity) 
    private repo: Repository<SampleRequestProcessInfoEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getAllProcessData(sampleId : number): Promise<any>{
        const query = await this.createQueryBuilder('sp')
        .select(`sp.process_info_id, sp.process, sp.description,sp.sample_request_id as sampleId`)
        .leftJoin(SampleRequest,'sr','sr.sample_request_id = sp.sample_request_id')
        .where(`sp.sf.sample_request_id = ${sampleId}`)
        .getRawMany()
        return query
    }
   
}