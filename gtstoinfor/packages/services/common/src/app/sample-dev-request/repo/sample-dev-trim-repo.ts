import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SampleRequestTriminfoEntity } from "../entities/sample-request-trim-info-entity";

@Injectable()
export class SampleTrimRepo extends Repository<SampleRequestTriminfoEntity> {
    constructor(@InjectRepository(SampleRequestTriminfoEntity) 
    private repo: Repository<SampleRequestTriminfoEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

      async getAllSampleReqNo(): Promise<any> {
        const query = await this.createQueryBuilder()
            .select(`description`)
        return query.getRawMany()
    }
}