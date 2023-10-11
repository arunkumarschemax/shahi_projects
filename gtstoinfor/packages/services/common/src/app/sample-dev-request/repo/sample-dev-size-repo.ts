import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SampleReqSizeEntity } from "../entities/sample-requset-size-info-entity";
import { Size } from "../../sizes/sizes-entity";
import { Colour } from "../../colours/colour.entity";
import { SampleRequest } from "../entities/sample-dev-request.entity";

@Injectable()
export class SampleSizeRepo extends Repository<SampleReqSizeEntity> {
    constructor(@InjectRepository(SampleReqSizeEntity) 
    private repo: Repository<SampleReqSizeEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getAllSizeData(sampleId: number): Promise<any>{
        const query = await this.createQueryBuilder('ss')
        .select(`ss.sample_req_size_id, ss.colour_id,c.colour,ss.size_id, size.sizes,ss.quantity,ss.sample_request_id as sampleId`)
        .leftJoin(Size,'size.size_id = ss.size_id')
        .leftJoin(Colour,'c','c.colour_id = ss.colour_id')
        .leftJoin(SampleRequest,'sr','sr.sample_request_id = ss.sample_request_id')
        .where(`ss.sample_request_id = ${sampleId}`)
        .getRawMany()
        return query
    }
   
}