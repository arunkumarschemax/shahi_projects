import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FabricRequestEntity } from "../fabric-request.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FabricApprovalReq } from "../dto/fabric-approval-req";
import { promises } from "dns";
import { FabricRequestQualitiesEntity } from "../fabric-request-qualities.entity";
import { StatusEnum } from "@project-management-system/shared-models";

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

    async getAllFabricRequestNo(): Promise<any[]> {
        const query =  this.createQueryBuilder()
            .select(`fabric_request_id as fabricRequestId,request_no as requestNo`)
            .orderBy(`fabric_request_id`)
            return await query.getRawMany()
    }

}