// import { EntityRepository, Repository } from "typeorm";
// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { groupBy } from "rxjs";
// import { SampleRequest } from "../entities/sample-dev-request.entity";
// import { SampleFilterRequest } from "@project-management-system/shared-models";
// import { Location } from "../../locations/location.entity";
// import { Style } from "../../style/dto/style-entity";
// import { ProfitControlHead } from '../../profit-control-head/profit-control-head-entity';
// import { Buyers } from "../../buyers/buyers.entity";
// import { SampleTypes } from "../../sample Types/sample-types.entity";
// import { SampleSubTypes } from "../../sample-sub-types/sample-sub-types.entity";
// import { Brands } from "../../master-brands/master-brands.entity";
// import { EmplyeeDetails } from '../../employee-details/dto/employee-details-entity';



// @Injectable()
// export class SampleRequestRepository extends Repository<SampleRequest> {
//     constructor(@InjectRepository(SampleRequest) private repo: Repository<SampleRequest>
//     ) {
//         super(repo.target, repo.manager, repo.queryRunner);
//     }
//         async getsampleId(): Promise<any> {
//             const query = this.createQueryBuilder('sm')
//                 .select(` MAX(sample_request_id) as id`)
//                 // .orderBy(` created_at`, 'DESC')
//             return await query.getRawOne();
//         }

//     async getAllSampleDevData(req?: SampleFilterRequest): Promise<any[]> {
//         const query =  this.createQueryBuilder('sr')
//             .select(`sr.sample_request_id,sr.request_no as requestNo,sr.user,sr.description,sr.remarks,sr.cost_ref as costRef, sr.m3_style_no as m3StyleNo, sr.contact,sr.extension,
//             sr.sam_value as samValue,sr.product,sr.type,sr.conversion,sr.made_in as madeIn, sr.facility_id,sr.status,sr.location_id,
//             l.location_name AS locationName,sr.style_id,s.style,sr.profit_control_head_id,pch.profit_control_head AS pch,sr.buyer_id,
//             b.buyer_name AS buyerName, b.buyer_code AS buyerCode,sr.sample_type_id,st.sample_type AS sampleType,sr.sample_sub_type_id,
//             sst.sample_sub_type AS sampleSubType,sr.brand_id, br.brand_name AS brandName,sr.dmm_id, ed.first_name AS dmmName,
//             sr.technician_id, ed.first_name AS techName`)
//             .leftJoin(Location,'l','l.location_id = l.location_id')
//             .leftJoin(Style,'s','s.style_id = sr.style_id')
//             .leftJoin(ProfitControlHead,'pch','pch.profit_control_head_id = sr.profit_control_head_id')
//             .leftJoin(Buyers,'b','b.buyer_id = sr.buyer_id')
//             .leftJoin(SampleTypes,'st','st.sample_type_id = sr.sample_type_id')
//             .leftJoin(SampleSubTypes,'sst','sst.sample_sub_type_id = sr.sample_sub_type_id')
//             .leftJoin(Brands,'br','br.brand_id = sr.brand_id')
//             .leftJoin(EmplyeeDetails,'ed','ed.employee_id = sr.dmm_id AND sr.technician_id')
//             if (req.reqNo !== undefined) {
//                 query.andWhere(`sr.request_no ='${req.reqNo}'`)
//             }
//             if (req.pch !== undefined) {
//                 query.andWhere(`pch.profit_control_head ='${req.pch}'`)
//             }
//             if (req.styleNo !== undefined) {
//                 query.andWhere(`sr.m3_style_no ='${req.styleNo}'`)
//             }
//             if (req.status !== undefined) {
//                 query.andWhere(`sr.status ='${req.status}'`)
//             }
//             query.groupBy(`sr.request_no`)
//             query.orderBy(`sample_request_id`)
//         return await query.getRawMany()
//     }

//     async getAllSampleReqNo(): Promise<any> {
//         const query = await this.createQueryBuilder()
//             .select(`request_no`)
//             .where(`request_no is not null`)
//             .orderBy(`request_no`)
//         return query.getRawMany()
//     }

//     async getAllPCH(): Promise<any> {
//         const query = await this.createQueryBuilder('sr')
//             .select(`sr.profit_control_head_id,pch.profit_control_head AS pch`)
//             .leftJoin(ProfitControlHead,'pch','pch.profit_control_head_id = sr.profit_control_head_id')
//             .where(`pch.profit_control_head is not null`)
//             .orderBy(`pch.profit_control_head`)
//             .groupBy(`pch.profit_control_head`)
//         return query.getRawMany()
//     }

//     async getAllStyleNo(): Promise<any> {
//         const query = await this.createQueryBuilder()
//             .select(`m3_style_no as m3StyleNo`)
//             .where(`m3_style_no is not null`)
//             .orderBy(`m3_style_no`)
//         return query.getRawMany()
//     }

// } 



// import { EntityRepository, Repository } from 'typeorm';
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { SampleRequest } from '../entities/sample-dev-request.entity';
// import { SampleFilterRequest } from '@project-management-system/shared-models';
// import { Location } from '../../locations/location.entity';
// import { Style } from '../../style/dto/style-entity';
// import { ProfitControlHead } from '../../profit-control-head/profit-control-head-entity';
// import { Buyers } from '../../buyers/buyers.entity';
// import { SampleTypes } from '../../sample Types/sample-types.entity';
// import { SampleSubTypes } from '../../sample-sub-types/sample-sub-types.entity';
// import { Brands } from '../../master-brands/master-brands.entity';
// import { EmplyeeDetails } from '../../employee-details/dto/employee-details-entity';

// @Injectable()
// @EntityRepository(SampleRequest)
// export class SampleRequestRepository extends Repository<SampleRequest> {
//     constructor(@InjectRepository(SampleRequest) private repo: Repository<SampleRequest>) {
//         super(repo.target, repo.manager, repo.queryRunner);
//     }

//     async getAllSampleDevData(req?: SampleFilterRequest): Promise<any[]> {
//         const query = this.createQueryBuilder('sr')
//             .select([
//                 'sr.sample_request_id',
//                 'sr.request_no AS requestNo',
//                 'sr.cost_ref AS costRef',
//                 'sr.m3_style_no AS m3StyleNo',
//                 'sr.contact',
//                 'sr.extension',
//                 'sr.sam_value AS samValue',
//                 'sr.product',
//                 'sr.type',
//                 'sr.conversion',
//                 'sr.made_in AS madeIn',
//                 'sr.facility_id',
//                 'sr.status',
//                 'sr.location_id',
//                 'l.location_name AS locationName',
//                 'sr.style_id',
//                 's.style',
//                 'sr.profit_control_head_id',
//                 'pch.profit_control_head AS pch',
//                 'sr.buyer_id',
//                 'b.buyer_name AS buyerName',
//                 'b.buyer_code AS buyerCode',
//                 'sr.sample_type_id',
//                 'st.sample_type AS sampleType',
//                 'sr.sample_sub_type_id',
//                 'sst.sample_sub_type AS sampleSubType',
//                 'sr.brand_id',
//                 'br.brand_name AS brandName',
//                 'sr.dmm_id',
//                 'ed1.first_name AS dmmName',
//                 'sr.technician_id',
//                 'ed2.first_name AS techName',
//                 'srfi.fabric_info_id',
//                 'srfi.fabric_code',
//                 'srfi.description AS fabric_description',
//                 'srfi.colour_id',
//                 'srfi.consumption AS fabric_consumption',
//                 'srfi.sample_request_id AS fabric_sample_request_id',
//                 'stri.trim_info_id',
//                 'stri.description AS trim_description',
//                 'stri.consumption AS trim_consumption',
//                 'stri.sample_request_id AS trim_sample_request_id'
//             ])
//             .leftJoin(Location, 'l', 'l.location_id = sr.location_id')
//             .leftJoin(Style, 's', 's.style_id = sr.style_id')
//             .leftJoin(ProfitControlHead, 'pch', 'pch.profit_control_head_id = sr.profit_control_head_id')
//             .leftJoin(Buyers, 'b', 'b.buyer_id = sr.buyer_id')
//             .leftJoin(SampleTypes, 'st', 'st.sample_type_id = sr.sample_type_id')
//             .leftJoin(SampleSubTypes, 'sst', 'sst.sample_sub_type_id = sr.sample_sub_type_id')
//             .leftJoin(Brands, 'br', 'br.brand_id = sr.brand_id')
//             .leftJoin(EmplyeeDetails, 'ed1', 'ed1.employee_id = sr.dmm_id')
//             .leftJoin(EmplyeeDetails, 'ed2', 'ed2.employee_id = sr.technician_id')
//             .leftJoin('sample_request_fabric_info', 'srfi', 'srfi.sample_request_id = sr.sample_request_id')
//             .leftJoin('sample_request_trim_info', 'stri', 'stri.sample_request_id = sr.sample_request_id');

//         if (req && req.reqNo !== undefined) {
//             query.andWhere(`sr.request_no = :reqNo`, { reqNo: req.reqNo });
//         }
//         if (req && req.pch !== undefined) {
//             query.andWhere(`pch.profit_control_head = :pch`, { pch: req.pch });
//         }
//         if (req && req.styleNo !== undefined) {
//             query.andWhere(`sr.m3_style_no = :styleNo`, { styleNo: req.styleNo });
//         }
//         if (req && req.status !== undefined) {
//             query.andWhere(`sr.status = :status`, { status: req.status });
//         }

//         query.groupBy(`sr.request_no`);
//         query.addOrderBy(`sr.sample_request_id`);

//         return await query.getRawMany();
//     }

//     async getAllSampleReqNo(): Promise<any[]> {
//         const query = this.createQueryBuilder()
//             .select(`request_no`)
//             .where(`request_no is not null`)
//             .orderBy(`request_no`);

//         return query.getRawMany();
//     }

//     async getAllPCH(): Promise<any[]> {
//         const query = this.createQueryBuilder('sr')
//             .select(`sr.profit_control_head_id, pch.profit_control_head AS pch`)
//             .leftJoin(ProfitControlHead, 'pch', 'pch.profit_control_head_id = sr.profit_control_head_id')
//             .where(`pch.profit_control_head is not null`)
//             .orderBy(`pch.profit_control_head`)
//             .groupBy(`pch.profit_control_head`);

//         return query.getRawMany();
//     }

//     async getAllStyleNo(): Promise<any[]> {
//         const query = this.createQueryBuilder()
//             .select(`m3_style_no as m3StyleNo`)
//             .where(`m3_style_no is not null`)
//             .orderBy(`m3_style_no`);

//         return query.getRawMany();
//     }
// }




import { DataSource, EntityRepository, Repository, getManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { groupBy } from "rxjs";
import { SampleRequest } from "../entities/sample-dev-request.entity";
import { SampleFilterRequest, SampleRequestFilter } from "@project-management-system/shared-models";
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

import { SamplingbomEntity } from "../entities/sampling-bom-entity";
import { M3StyleEntity } from "../../m3-style-codes/m3-style.entity";
import { RmCreationEntity } from "../../m3-items/rm-items.entity";
import { Countries } from "../../countries/countries.entity";
import { M3ItemsEntity } from "../../m3-items/m3-items.entity";
import { M3TrimsEntity } from "../../m3-trims/m3-trims.entity";



@Injectable()
export class SampleRequestRepository extends Repository<SampleRequest> {
    constructor(@InjectRepository(SampleRequest)
    private repo: Repository<SampleRequest>,
        public dataSource: DataSource
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }
    async getsampleId(): Promise<any> {
        const query = this.createQueryBuilder('sm')
            .select(` MAX(sample_request_id) as id`)
        // .orderBy(` created_at`, 'DESC')
        return await query.getRawOne();
    };

    async sampleFabric(sampleId: string) {
        const query = await this.dataSource.createQueryBuilder(SampleReqFabricinfoEntity, 'srfi')
            .select(`srfi.fabric_info_id,srfi.fabric_code,srfi.colour_id,srfi.remarks AS fab_remarks,srfi.consumption AS fabric_consumption,srfi.sample_request_id AS fabric_sample_request_id,rm.item_code AS fabric_item_code`)
            .leftJoin(SampleRequest, 'sr', ' sr.sample_request_id=srfi.sample_request_id ')
            .leftJoin(RmCreationEntity, 'rm', ' rm.rm_item_id=srfi.fabric_code ')
            .where(`srfi.sample_request_id = "${sampleId}"`)
            .getRawMany()
        return query.map((rec) => {
            return {
                fabric_info_id: rec.fabric_info_id,fabric_item_code:rec.fabric_item_code, fabric_code: rec.fabric_code, fabric_description: rec.fabric_description, colour_id: rec.colour_id, fab_remarks: rec.fab_remarks, fabric_consumption: rec.fabric_consumption, fabric_sample_request_id: rec.fabric_sample_request_id
            }
        })

    };

    async sampleTrimData(sampleId: string) {
        const query = await this.dataSource.createQueryBuilder(SampleRequestTriminfoEntity, 'stri')
            .addSelect(`stri.trim_info_id,stri.consumption AS trim_consumption,stri.sample_request_id AS trim_sample_request_id,stri.remarks AS tri_remarks,mt.trim_code AS trim_item_code`)
            .leftJoin(SampleRequest, 'sr', 'sr.sample_request_id= stri.sample_request_id ')
            .leftJoin(M3TrimsEntity, 'mt', 'mt.m3_trim_id=stri.trim_code ')
            .where(`stri.sample_request_id = "${sampleId}"`)
            .getRawMany()
        return query.map((rec) => {
            return {
                trim_info_id: rec.trim_info_id,trim_item_code:rec.trim_item_code, trim_description: rec.trim_description, trim_consumption: rec.trim_consumption, tri_remarks: rec.tri_remarks, trim_sample_request_id: rec.trim_sample_request_id
            }
        })

    };




    async getAllSampleDevData(req?: SampleFilterRequest): Promise<any[]> {
        console.log(req,"req")
        const query = this.createQueryBuilder('sr')
            .select(`sr.sample_request_id,sr.description,sr.remarks,sr.user,sr.request_no AS requestNo,sr.cost_ref AS costRef,sr.contact,sr.extension,sr.sam_value AS samValue,sr.product,sr.type,sr.conversion,sr.made_in AS madeIn,sr.facility_id,sr.status,sr.location_id,sr.style_id,sr.profit_control_head_id,sr.buyer_id,sr.brand_id,sr.dmm_id,sr.technician_id,co.country_name`)
            .addSelect(`l.location_name AS locationName,s.style,pch.profit_control_head AS pch,b.buyer_name AS buyerName,b.buyer_code AS buyerCode,br.brand_name AS brandName,ed1.first_name AS dmmName,ed2.first_name AS techName`)
            .leftJoin(Location, 'l', 'l.location_id = sr.location_id')
            .leftJoin(Style, 's', 's.style_id = sr.style_id')
            .leftJoin(ProfitControlHead, 'pch', 'pch.profit_control_head_id = sr.profit_control_head_id')
            .leftJoin(Buyers, 'b', 'b.buyer_id = sr.buyer_id')
            // .leftJoin(SampleTypes, 'st', 'st.sample_type_id = sr.sample_type_id')
            // .leftJoin(SampleSubTypes, 'sst', 'sst.sample_sub_type_id = sr.sample_sub_type_id')
            .leftJoin(Brands, 'br', 'br.brand_id = sr.brand_id')
            .leftJoin(EmplyeeDetails, 'ed1', 'ed1.employee_id = sr.dmm_id')
            .leftJoin(EmplyeeDetails, 'ed2', 'ed2.employee_id = sr.technician_id')
            // .leftJoin(M3StyleEntity, 'm3', 'm3.m3_style_Id=sr.m3_style_no')
            .leftJoin(Countries, 'co', 'co.country_id= sr.made_in')
            .leftJoin(SampleReqFabricinfoEntity,'srfi','srfi.sample_request_id = sr.sample_request_id',)
            .leftJoin(SampleRequestTriminfoEntity,'srti','srti.sample_request_id = sr.sample_request_id')
            .leftJoin(M3ItemsEntity,'m3items','m3items.m3_items_Id  = srfi.fabric_code')
            .leftJoin(M3TrimsEntity,'m3trims','m3trims.m3_trim_Id = srti.trim_code')

        if (req.reqNo !== undefined) {
            query.andWhere(`sr.request_no ='${req.reqNo}'`)
        }
        if (req.pch !== undefined) {
            query.andWhere(`pch.profit_control_head ='${req.pch}'`)
        }
        // if (req.styleNo !== undefined) {
        //     query.andWhere(`sr.style_no ='${req.styleNo}'`)
        // }
        if (req.status !== undefined) {
            query.andWhere(`sr.status ='${req.status}'`)
        }
        // query.groupBy(`sr.sample_request_id`)
        query.groupBy(`sr.sample_request_id`)
        return await query.getRawMany();

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
            .leftJoin(ProfitControlHead, 'pch', 'pch.profit_control_head_id = sr.profit_control_head_id')
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


    // async getSampleRequestReport (){
    //     const query = this.createQueryBuilder(`sr`)
    //     .select (`sr.sample_request_id,sr.request_no,sr.m3_style_no,srf.fabric_code AS fabricCode,srf.consumption AS fConsumption,
    //     srt.trim_code AS trimCode,srt.consumption AS tConsumption,assigned_quantity,sr.required_quantity`)
    //     .leftJoin(SampleReqFabricinfoEntity,'srf','srf.sample_request_id= sr.sample_request_id')
    //     .leftJoin(SampleRequestTriminfoEntity,'srt','srt.sample_request_id = sr.sample_request_id')
    //     .leftJoin(SamplingbomEntity,'sb','sb.sample_request_id = sr.sample_request_id')
    //     // LEFT JOIN `sampling_bom`sb ON sb.sample_request_id=sr.sample_request_id
    //     // .leftJoin`rm_items`rm ON rm.rm_item_id=srf.fabric_code
    //     // .leftJoin(SampleRequestTriminfoEntity,'srt','srt.material_issue_id = sr.material_issue_id')
    //     const data = await query.getRawMany()
    //     return data 
    // }

    async getAllRequestNo(): Promise<any> {
        const query = await this.createQueryBuilder('sb')
            .select(`sb.request_no`)
            .where(`sb.request_no is not null`)
            .orderBy(`sb.request_no`)
        const data = await query.getRawMany()
        return data;
    }

    async getAllBuyers(): Promise<any> {
        const query = await this.createQueryBuilder('bu')
            .select(`bu.buyer_name `)
            .where(`bu.buyer_name is not null`)
            .orderBy(`bu.buyer_name`)
        const data = await query.getRawMany()
        return data;
    }


} 
