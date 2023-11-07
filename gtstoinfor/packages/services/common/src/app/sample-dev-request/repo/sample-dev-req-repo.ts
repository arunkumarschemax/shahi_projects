import { EntityRepository, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { groupBy } from "rxjs";
import { SampleRequest } from "../entities/sample-dev-request.entity";
import { SampleFilterRequest } from "@project-management-system/shared-models";
import { Location } from "../../locations/location.entity";
import { Style } from "../../style/dto/style-entity";
import { ProfitControlHead } from '../../profit-control-head/profit-control-head-entity';
import { Buyers } from "../../buyers/buyers.entity";
import { SampleTypes } from "../../sample Types/sample-types.entity";
import { SampleSubTypes } from "../../sample-sub-types/sample-sub-types.entity";
import { Brands } from "../../master-brands/master-brands.entity";
import { EmplyeeDetails } from '../../employee-details/dto/employee-details-entity';
import { SampleReqFabricinfoEntity } from "../entities/sample-request-fabric-info-entity";
import { SampleRequestTriminfoEntity } from "../entities/sample-request-trim-info-entity";



@Injectable()
export class SampleRequestRepository extends Repository<SampleRequest> {
    constructor(@InjectRepository(SampleRequest) private repo: Repository<SampleRequest>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }
        async getsampleId(): Promise<any> {
            const query = this.createQueryBuilder('sm')
                .select(` MAX(sample_request_id) as id`)
                // .orderBy(` created_at`, 'DESC')
            return await query.getRawOne();
        }

    async getAllSampleDevData(req?: SampleFilterRequest): Promise<any[]> {
        const query =  this.createQueryBuilder('sr')
            .select(`sr.sample_request_id,sr.request_no as requestNo,sr.cost_ref as costRef, sr.m3_style_no as m3StyleNo, sr.contact,sr.extension,
            sr.sam_value as samValue,sr.product,sr.type,sr.conversion,sr.made_in as madeIn, sr.facility_id,sr.status,sr.location_id,
            l.location_name AS locationName,sr.style_id,s.style,sr.profit_control_head_id,pch.profit_control_head AS pch,sr.buyer_id,
            b.buyer_name AS buyerName, b.buyer_code AS buyerCode,sr.sample_type_id,st.sample_type AS sampleType,sr.sample_sub_type_id,
            sst.sample_sub_type AS sampleSubType,sr.brand_id, br.brand_name AS brandName,sr.dmm_id, ed.first_name AS dmmName,
            sr.technician_id, ed.first_name AS techName`)
            .leftJoin(Location,'l','l.location_id = l.location_id')
            .leftJoin(Style,'s','s.style_id = sr.style_id')
            .leftJoin(ProfitControlHead,'pch','pch.profit_control_head_id = sr.profit_control_head_id')
            .leftJoin(Buyers,'b','b.buyer_id = sr.buyer_id')
            .leftJoin(SampleTypes,'st','st.sample_type_id = sr.sample_type_id')
            .leftJoin(SampleSubTypes,'sst','sst.sample_sub_type_id = sr.sample_sub_type_id')
            .leftJoin(Brands,'br','br.brand_id = sr.brand_id')
            .leftJoin(EmplyeeDetails,'ed','ed.employee_id = sr.dmm_id AND sr.technician_id')
            if (req.reqNo !== undefined) {
                query.andWhere(`sr.request_no ='${req.reqNo}'`)
            }
            if (req.pch !== undefined) {
                query.andWhere(`pch.profit_control_head ='${req.pch}'`)
            }
            if (req.styleNo !== undefined) {
                query.andWhere(`sr.m3_style_no ='${req.styleNo}'`)
            }
            if (req.status !== undefined) {
                query.andWhere(`sr.status ='${req.status}'`)
            }
            query.groupBy(`sr.request_no`)
            query.orderBy(`sample_request_id`)
        return await query.getRawMany()
    }

    async getAllSampleReqNo(): Promise<any> {
        const query = await this.createQueryBuilder()
            .select(`request_no`)
            .where(`request_no is not null`)
            .orderBy(`request_no`)
        return query.getRawMany()
    }

    async getAllPCH(): Promise<any> {
        const query = await this.createQueryBuilder('sr')
            .select(`sr.profit_control_head_id,pch.profit_control_head AS pch`)
            .leftJoin(ProfitControlHead,'pch','pch.profit_control_head_id = sr.profit_control_head_id')
            .where(`pch.profit_control_head is not null`)
            .orderBy(`pch.profit_control_head`)
            .groupBy(`pch.profit_control_head`)
        return query.getRawMany()
    }
    
    async getAllStyleNo(): Promise<any> {
        const query = await this.createQueryBuilder()
            .select(`m3_style_no as m3StyleNo`)
            .where(`m3_style_no is not null`)
            .orderBy(`m3_style_no`)
        return query.getRawMany()
    }


    async getSampleRequestReport (){
        const query = this.createQueryBuilder(`sr`)
        .select (`sr.sample_request_id,sr.request_no,sr.m3_style_no,srf.fabric_code AS fabricCode,srf.consumption AS fConsumption,srt.trim_code AS trimCode,srt.consumption AS tConsumption`)
        .leftJoin(SampleReqFabricinfoEntity,'srf','srf.sample_request_id= sr.sample_request_id')
        .leftJoin(SampleRequestTriminfoEntity,'srt','srt.sample_request_id = sr.sample_request_id')
        // .leftJoin`rm_items`rm ON rm.rm_item_id=srf.fabric_code
        // .leftJoin(SampleRequestTriminfoEntity,'srt','srt.material_issue_id = sr.material_issue_id')
        const data = await query.getRawMany()
        return data 
    }
    
} 
