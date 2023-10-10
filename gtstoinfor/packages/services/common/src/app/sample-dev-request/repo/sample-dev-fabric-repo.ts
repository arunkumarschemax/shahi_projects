import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SampleReqFabricinfoEntity } from "../entities/sample-request-fabric-info-entity";
import { Colour } from "../../colours/colour.entity";
import { SampleRequest } from "../entities/sample-dev-request.entity";

@Injectable()
export class SampleFabricRepo extends Repository<SampleReqFabricinfoEntity> {
    constructor(@InjectRepository(SampleReqFabricinfoEntity) 
    private repo: Repository<SampleReqFabricinfoEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }
    async getAllRoutesData():Promise<any>{
        const query = await this.createQueryBuilder('routes')
        .select(`now()`)
        .getRawMany();
        console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
        return query
    }

    async getAllFabricData(sampleId: number): Promise<any>{
        const query = await this.createQueryBuilder('sf')
        .select(`sf.fabric_info_id, sf.fabric_code, sf.description, sf.colour_id, c.colour,sf.consumption, sf.remarks, sf.sample_request_id as sampleId`)
        .leftJoin(Colour,'c','c.colour_id = sf.colour_id')
        .leftJoin(SampleRequest,'sr','sr.sample_request_id = sf.sample_request_id')
        .where(`sf.sample_request_id = ${sampleId}`)
        .getRawMany()
        return query
    }
   
}