import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FabricRequestQualitiesEntity } from "../fabric-request-qualities.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FabricRequestQualitiesInfoEntity } from "../fabric-request-quality-info.entity";
import { Colour } from "../../colours/colour.entity";
import { Style } from "../../style/dto/style-entity";
import { UomEntity } from "../../uom/uom-entity";
import { FabricApprovalReq } from "../dto/fabric-approval-req";
import { FabricDevReqId } from "@project-management-system/shared-models";

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
    async getAllQltyData(req:FabricDevReqId): Promise<any> {
        const query =  this.createQueryBuilder('frq')
            .select(`frq.fabric_req_quality_id , frq.quality ,  frq.placement  , frq.width , frq.fabric_description , frq.description , frq.fabric_code ,  frq.fabric_request_id , frq.is_approved`)
            .where(`fabric_request_id = ${req.fabricRequestId}`)
        return await query.getRawMany()

    }

}