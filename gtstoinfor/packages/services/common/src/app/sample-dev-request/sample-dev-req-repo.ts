import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SampleRequest } from "./sample-dev-request.entity";
import { SampleFilterRequest } from "@project-management-system/shared-models";

@Injectable()
export class SampleRequestRepository extends Repository<SampleRequest> {
    constructor(@InjectRepository(SampleRequest) 
    private repo: Repository<SampleRequest>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getAllSampleDevData(req?: SampleFilterRequest): Promise<any> {
        const query = await this.createQueryBuilder()
            .select(`sample_request_id,request_no,cost_ref,m3_style_no,contact,extension,sam_value,product,type,conversion,made_in,facility_id,status,location_id,style_id,
            profit_control_head_id,buyer_id,sample_type_id,sample_sub_type_id,brand_id,dmm_id,technician_id`)
            .where(`request_no > 0`)
            if (req.reqNo !== undefined) {
                query.andWhere(`request_no ='${req.reqNo}'`)
            }
            if (req.pch !== undefined) {
                query.andWhere(`profit_control_head_id ='${req.pch}'`)
            }
            if (req.style !== undefined) {
                query.andWhere(`style_id ='${req.style}'`)
            }
            if (req.status !== undefined) {
                query.andWhere(`status ='${req.status}'`)
            }
            query.orderBy(`sample_request_id`)
        return query.getRawMany()
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