import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FabricRequestEntity } from "../fabric-request.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FabricApprovalReq } from "../dto/fabric-approval-req";
import { promises } from "dns";
import { FabricRequestQualitiesEntity } from "../fabric-request-qualities.entity";
import { StatusEnum } from "@project-management-system/shared-models";
import { Style } from "../../style/dto/style-entity";
import { Location } from "../../locations/location.entity";
import { Buyers } from "../../buyers/buyers.entity";
import { ProfitControlHead } from "../../profit-control-head/profit-control-head-entity";
import { SampleTypes } from "../../sample Types/sample-types.entity";
import { FactoriesEntity } from "../../factories/factories.entity";
import { EmplyeeDetails } from "../../employee-details/dto/employee-details-entity";

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
    async getAllFabricRequests(): Promise<any[]> {
        const query =  this.createQueryBuilder('fab')
            .select(`fab.request_no ,fab.type,fab.status,f.name,loc.location_name,b.buyer_name,pch.profit_control_head,st.sample_type,s.style,fb.first_name,fb.last_name
            `)
            .leftJoin(Style,'s',`s.style_id = fab.style_id`)
            .leftJoin( Location,'loc',` loc.location_id = fab.location_id`)
 .leftJoin( Buyers,'b',`b.buyer_id = fab.buyer_id`)
 .leftJoin( ProfitControlHead,'pch' , `pch.profit_control_head_id = fab.pch_id`)
 .leftJoin( SampleTypes, 'st' , `st.sample_type_id = fab.sample_type_id`)
 .leftJoin(FactoriesEntity, `f`, `f.id = fab.facility_id`)
 .leftJoin( EmplyeeDetails,`fb`, `fb.employee_id = fab.fabric_responsible`)

           return await query.getRawMany()
    }
}