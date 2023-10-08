import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SampleReqFabricinfoEntity } from "../entities/sample-request-fabric-info-entity";

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
   
}