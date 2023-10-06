import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SampleRequest } from "./sample-dev-request.entity";

@Injectable()
export class SampleRequestRepository extends Repository<SampleRequest> {
    constructor(@InjectRepository(SampleRequest) 
    private repo: Repository<SampleRequest>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getAllSampleReqNo(): Promise<any> {
        const query = await this.createQueryBuilder()
            .select(`request_no`)
            .where(`request_no is not null`)
            .orderBy(`request_no`)
            // .getRawMany()
            console.log(query,'[[[[[[[[[[[[[[[[[[[[[[[')
        return query.getRawMany()
    }

    // async getAllSampl
}