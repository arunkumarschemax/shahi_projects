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
import { SampleRequestProcessInfoEntity } from "../entities/sample-request-process-info-entity";
import { SampleReqSizeEntity } from "../entities/sample-requset-size-info-entity";
import { SampleRequestTriminfoEntity } from "../entities/sample-request-trim-info-entity";
import { Colour } from "../../colours/colour.entity";
import { Size } from "../../sizes/sizes-entity";



@Injectable()
export class SampleRequestRepository extends Repository<SampleRequest> {
    constructor(@InjectRepository(SampleRequest) private repo: Repository<SampleRequest>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getAllSampleDevData(req?: SampleFilterRequest): Promise<any[]> {
        const query =  this.createQueryBuilder('sr')
            .select(`sr.sample_request_id,sr.request_no as requestNo,sr.cost_ref,sr.m3_style_no as m3StyleNo,sr.contact,sr.extension,sr.sam_value,sr.product,sr.type,sr.conversion,sr.made_in,sr.facility_id,
            sr.status,sr.location_id,l.location_name AS locationName,sr.style_id,s.style,sr.profit_control_head_id,pch.profit_control_head AS pch,sr.buyer_id,
            b.buyer_name AS buyerName, b.buyer_code AS buyerCode,sr.sample_type_id,st.sample_type AS sampleType,sr.sample_sub_type_id,sst.sample_sub_type AS sampleSubType,
            sr.brand_id, br.brand_name AS brandName,sr.dmm_id, ed.first_name AS dmmName,sr.technician_id, ed.first_name AS techName,
            sf.fabric_code,sf.description,sf.colour_id,c.colour AS fabricColor,sf.consumption,sf.reamrks,
            sp.process,sp.description,
            ss.colour_id,colour.colour sizeColor,ss.size_id,size.sizes,ss.quantity,
            sti.description,sti.consumption,sti.remarks`)
            .leftJoin(Location,'l','l.location_id = l.location_id')
            .leftJoin(Style,'s','s.style_id = sr.style_id')
            .leftJoin(ProfitControlHead,'pch','pch.profit_control_head_id = sr.profit_control_head_id')
            .leftJoin(Buyers,'b','b.buyer_id = sr.buyer_id')
            .leftJoin(SampleTypes,'st','st.sample_type_id = sr.sample_type_id')
            .leftJoin(SampleSubTypes,'sst','sst.sample_sub_type_id = sr.sample_sub_type_id')
            .leftJoin(Brands,'br','br.brand_id = sr.brand_id')
            .leftJoin(EmplyeeDetails,'ed','ed.employee_id = sr.dmm_id AND sr.technician_id')
            .leftJoin(SampleReqFabricinfoEntity,'sf','sf.sample_request_id = sr.sample_request_id')
            .leftJoin(SampleRequestProcessInfoEntity,'sp','sp.sample_request_id = sr.sample_request_id')
            .leftJoin(SampleReqSizeEntity,'ss','ss.sample_request_id = sr.sample_request_id')
            .leftJoin(SampleRequestTriminfoEntity,'sti','sti.sample_request_id = sr.sample_request_id')
            .leftJoin(Colour,'c','c.colour_id = sf.colour_id')
            .leftJoin(Colour,'colour','colour.colour_id = ss.colour_id')
            .leftJoin(Size,'size','size.size_id = ss.size_id')
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
    
} 