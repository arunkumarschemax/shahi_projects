import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FabricRequestEntity } from "../fabric-request.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FabricRequestRepository extends Repository<FabricRequestEntity> {

    constructor(@InjectRepository(FabricRequestEntity) private FabricRepo: Repository<FabricRequestEntity>
    ) {
        super(FabricRepo.target, FabricRepo.manager, FabricRepo.queryRunner);
    }

    async getAllCount(): Promise<any> {
        const query =  this.createQueryBuilder('fabric_request')
            .select(`MAX(fabric_request_id) as fabric_request_id`)
            .orderBy(` created_at`, 'DESC')
        return await query.getRawOne()

    }
 

}