import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FabricRequestQualitiesEntity } from "../fabric-request-qualities.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FabricRequestQualitiesRepository extends Repository<FabricRequestQualitiesEntity> {

    constructor(@InjectRepository(FabricRequestQualitiesEntity)
         private FabricQualitiesRepo: Repository<FabricRequestQualitiesEntity>
    ) {
        super(FabricQualitiesRepo.target, FabricQualitiesRepo.manager, FabricQualitiesRepo.queryRunner);
    }

    async getAllCount(): Promise<any> {
        const query =  this.createQueryBuilder('fabric_req_qualities')
            .select(`MAX(fabric_req_quality_id) as fabric_req_quality_id`)
            .orderBy(` created_at`, 'DESC')
        return await query.getRawOne()

    }
 

}