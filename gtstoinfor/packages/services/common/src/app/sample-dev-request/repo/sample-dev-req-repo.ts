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
import { LifeCycleStatusEnum, MaterailViewDto, RequestNoReq, SampleFilterRequest, SampleRequestFilter } from "@project-management-system/shared-models";
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
import { StocksEntity } from "../../stocks/stocks.entity";
import { Colour } from "../../colours/colour.entity";
import { GrnItemsEntity } from "../../grn/entities/grn-items-entity";
import { GrnEntity } from "../../grn/entities/grn-entity";



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
            .select(`(sum(st.quantity)-sum(st.allocatd_quantity)) AS resltantavaliblequantity,sum(st.allocatd_quantity) as consumedQty,sum(st.quantity) AS availableQuantity,"fabric" as itemType,sr.sample_request_id as sampleRequestid,st.m3_item as stockM3ItemId,sr.buyer_id as buyerId,fabric_info_id,srfi.sample_request_id,c.colour,srfi.fabric_info_id,srfi.fabric_code as m3ItemFabricId,srfi.colour_id,srfi.remarks AS fab_remarks,srfi.consumption AS fabric_consumption,srfi.sample_request_id AS fabric_sample_request_id,m3items.item_code,Group_concat(st.id) AS stockIds,srfi.total_requirement,sb.status AS status`)
            .leftJoin(SampleRequest, 'sr', ' sr.sample_request_id=srfi.sample_request_id ')
            .leftJoin(SamplingbomEntity, 'sb', 'sb.m3_item_id= srfi.fabric_code and sb.sample_request_id = srfi.sample_request_id')
            // .leftJoin(RmCreationEntity, 'rm', ' rm.rm_item_id=srfi.fabric_code ')
            .leftJoin(M3ItemsEntity,'m3items','m3items.m3_items_Id  = srfi.fabric_code')
            .leftJoin(StocksEntity,'st','st.m3_item=srfi.fabric_code and st.item_type = "fabric" and st.buyer_id=sr.buyer_id')
            .leftJoin(Colour,'c','c.colour_id=srfi.colour_id')
            .where(`srfi.sample_request_id = "${sampleId}"`)
            .groupBy(`srfi.fabric_info_id`)
            .getRawMany()
        return query.map((rec) => {
            return {
                fabric_info_id: rec.fabric_info_id,fabric_item_code:rec.fabric_item_code, m3ItemFabricId: rec.m3ItemFabricId, fabric_description: rec.fabric_description, colour_id: rec.colour_id, fab_remarks: rec.fab_remarks, fabric_consumption: rec.fabric_consumption, fabric_sample_request_id: rec.fabric_sample_request_id,colour :rec.colour,item_code:rec.item_code,stockM3ItemId:rec.stockM3ItemId,buyerId:rec.buyerId,sampleRequestid:rec.sampleRequestid,itemType:rec.itemType,availableQuantity:rec.availableQuantity,stockIds:rec.stockIds,resltantavaliblequantity:rec.resltantavaliblequantity,consumedQty:rec.consumedQty,totalRequirement:rec.total_requirement,status:rec.status
            }
        })

    };

    async sampleTrimData(sampleId: string) {
        const query = await this.dataSource.createQueryBuilder(SampleRequestTriminfoEntity, 'stri')
            .addSelect(`(sum(st.quantity)-sum(st.allocatd_quantity)) AS resltantavaliblequantity,sum(st.allocatd_quantity) as consumedQty,stri.sample_request_id,mt.trim_type as trimType,sum(st.quantity) as availabeQuantity,stri.trim_info_id,stri.consumption AS trim_consumption,stri.total_requirement ,stri.sample_request_id AS trim_sample_request_id,stri.remarks AS tri_remarks,mt.trim_code AS trim_item_code,mt.trim_code AS m3trimcode, sr.buyer_id as buyerId, stri.trim_code as trimCode, sb.status AS status,stri.trim_info_id AS trimInfoId`)
            .leftJoin(SampleRequest, 'sr', 'sr.sample_request_id= stri.sample_request_id ')
            .leftJoin(SamplingbomEntity, 'sb', 'sb.m3_item_id= stri.trim_code and sb.sample_request_id = stri.sample_request_id')
            .leftJoin(M3TrimsEntity, 'mt', 'mt.m3_trim_id=stri.trim_code ')
            .leftJoin(StocksEntity,'st','st.m3_item=stri.trim_code and sr.buyer_id=st.buyer_id')
            .leftJoin(GrnItemsEntity,'gi','gi.grn_item_id=st.grn_item_id')
            .leftJoin(GrnEntity,'g','g.grn_id=gi.grn_id and g.grn_type = "INDENT"')
            .where(`stri.sample_request_id = "${sampleId}"`)
            .groupBy(`st.buyer_id,stri.trim_info_id`)
            .getRawMany()
        return query.map((rec) => {
            return {
                trim_info_id: rec.trim_info_id,trim_item_code:rec.trim_item_code, trim_description: rec.trim_description, trim_consumption: rec.trim_consumption, tri_remarks: rec.tri_remarks, trim_sample_request_id: rec.trim_sample_request_id,trim_code:rec.m3trimcode,availabeQuantity:rec.availabeQuantity,trimType:rec.trimType,sample_request_idmt:rec.sample_request_id,resltantavaliblequantity:rec.resltantavaliblequantity,consumedQty:rec.consumedQty,buyerId:rec.buyerId,trimCode:rec.trimCode,status:rec.status,itemType:rec.trimType,sampleRequestid:rec.trim_sample_request_id,sampleItemId:rec.trimInfoIdm,totalRequirement:rec.total_requirement
            }
        })

    };




    async getAllSampleDevData(req: SampleFilterRequest): Promise<any[]> {
        console.log(req,"hhhhhhhhhhhh")
        const query = this.createQueryBuilder('sr')
            .select(`sr.location_id as location,life_cycle_status as lifeCycleStatus,st.quantity,sr.sample_request_id,sr.description,sr.remarks,sr.user,sr.request_no AS requestNo,sr.cost_ref AS costRef,sr.contact,sr.extension,sr.sam_value AS samValue,sr.product,sr.type,sr.conversion,sr.made_in AS madeIn,sr.facility_id,sr.status,sr.location_id,sr.style_id,sr.profit_control_head_id,sr.buyer_id,sr.brand_id,sr.dmm_id,sr.technician_id,co.country_name,sr.life_cycle_status AS lifeCycleStatus,clr.colour`)
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
            // .leftJoin(M3StyleEntity, 'm3', 'm3.m3_style_Id=sr.m3_style_no')fabric_info_id
            .leftJoin(Countries, 'co', 'co.country_id= sr.made_in')
            .leftJoin(SampleReqFabricinfoEntity,'srfi','srfi.sample_request_id = sr.sample_request_id',)
            .leftJoin(Colour,'clr','clr.colour_id = srfi.colour_id')
            .leftJoin(SampleRequestTriminfoEntity,'srti','srti.sample_request_id = sr.sample_request_id')
            .leftJoin(M3ItemsEntity,'m3items','m3items.m3_items_Id  = srfi.fabric_code')
            .leftJoin(M3TrimsEntity,'m3trims','m3trims.m3_trim_Id = srti.trim_code')
            .leftJoin(StocksEntity,'st','st.buyer_id=sr.buyer_id')
            // .leftJoin(SampleReqFabricinfoEntity,'sf','sf.fabric_code=st.item_id')
            // .leftJoin(SampleRequestTriminfoEntity,'srt','srt.trim_code=st.item_id')
             .where('1 =1')

if(req){
    console.log(req.reqNo,"req.reqqqqqqqqqqqqqqqqqqqqqq");
    
    if (req.reqNo !== undefined) {
        query.andWhere(`sr.sample_request_id =${req.reqNo}`);
    }
    if (req.pch !== undefined) {
        query.andWhere(`pch.profit_control_head_id
        =${req.pch}`);
    }
    if (req.styleNo !== undefined) {
        query.andWhere(`sr.style_id ='${req.styleNo}'`)
    }
    if (req.pch !== undefined) {
        query.andWhere(`sr.profit_control_head_id ='${req.pch}'`)
    }
    if (req.status !== undefined) {
        query.andWhere(`sr.life_cycle_status ='${req.status}'`);
    }
    if(req.extRefNumber){
        query.andWhere(` b.external_ref_number = '${req.extRefNumber}'`)
    }
}
        
        query.groupBy(`sr.sample_request_id`)
        // console.log('query-----------------')
        // console.log(query)
        return await query.getRawMany();

    }

    async getAllSampleReqNo(): Promise<any> {
        const query = await this.createQueryBuilder()
            .select(`request_no`)
            .where(`request_no is not null`)
            .orderBy(`request_no`)
        return query.getRawMany()
    }

    async getAllSampleReqDropDown(): Promise<any> {
        const query = await this.createQueryBuilder()
            .select(`sample_request_id AS sampleRequestId, request_no AS reqNo,style_id as styleId`)
            .where(`request_no is not null`)
            .orderBy(`request_no`)
        return query.getRawMany()
    }

    async getIssuedSampleRequests(buyerId?:number): Promise<any> {
        const query = await this.createQueryBuilder()
            .select(`sample_request_id AS sampleRequestId, request_no AS reqNo,style_id as styleId`)
            .where(`request_no is not null and life_cycle_status in('${LifeCycleStatusEnum.MATERIAL_ISSUED}','${LifeCycleStatusEnum.CUTTING}','${LifeCycleStatusEnum.SEWING}','${LifeCycleStatusEnum.FINISHING}') `)
            if(buyerId){
                query.andWhere(`buyer_id = ${buyerId}`)
            }
            query.orderBy(`request_no`)
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


async getmaterialissue():Promise<any[]>{
    const query=this.createQueryBuilder('sr')
    
    .select('sr.location_id as location,life_cycle_status as lifeCycleStatus,st.quantity,sr.sample_request_id,sr.description,sr.remarks,sr.user,sr.request_no AS requestNo,sr.cost_ref AS costRef,sr.contact,sr.extension,sr.sam_value AS samValue,sr.product,sr.type,sr.conversion,sr.made_in AS madeIn,sr.facility_id,sr.status,sr.location_id,sr.style_id,sr.profit_control_head_id,sr.buyer_id,sr.brand_id,sr.dmm_id,sr.technician_id,co.country_name,sr.life_cycle_status AS lifeCycleStatus,clr.colour')
    
    .addSelect(`l.location_name AS locationName,s.style,pch.profit_control_head AS pch,b.buyer_name AS buyerName,b.buyer_code AS buyerCode,br.brand_name AS brandName,ed1.first_name AS dmmName,ed2.first_name AS techName`)
    .leftJoin(Location, 'l', 'l.location_id = sr.location_id')
    .leftJoin(Style, 's', 's.style_id = sr.style_id')
    .leftJoin(ProfitControlHead, 'pch', 'pch.profit_control_head_id = sr.profit_control_head_id')
    .leftJoin(Buyers, 'b', 'b.buyer_id = sr.buyer_id')
    
    .leftJoin(Brands, 'br', 'br.brand_id = sr.brand_id')
    .leftJoin(EmplyeeDetails, 'ed1', 'ed1.employee_id = sr.dmm_id')
    .leftJoin(EmplyeeDetails, 'ed2', 'ed2.employee_id = sr.technician_id')
    .leftJoin(Countries, 'co', 'co.country_id= sr.made_in')
    .leftJoin(SampleReqFabricinfoEntity,'srfi','srfi.sample_request_id = sr.sample_request_id',)
    .leftJoin(Colour,'clr','clr.colour_id = srfi.colour_id')
    .leftJoin(SampleRequestTriminfoEntity,'srti','srti.sample_request_id = sr.sample_request_id')
    .leftJoin(M3ItemsEntity,'m3items','m3items.m3_items_Id  = srfi.fabric_code')
    .leftJoin(M3TrimsEntity,'m3trims','m3trims.m3_trim_Id = srti.trim_code')
    .leftJoin(StocksEntity,'st','st.buyer_id=sr.buyer_id')
    .where('sr.life_cycle_status = :status', { status: 'MATERIAL_ISSUED' });

    return await query.getRawMany();
}

async getbyID(req:MaterailViewDto):Promise<any>{
    const query =await this.createQueryBuilder('sr')
    //  .select(`*`)
    //  .where(`sam.sample_request_id=${req.id}`)
    .select('sr.location_id as location,life_cycle_status as lifeCycleStatus,st.quantity,sr.sample_request_id,sr.description,sr.remarks,sr.user,sr.request_no AS requestNo,sr.cost_ref AS costRef,sr.contact,sr.extension,sr.sam_value AS samValue,sr.product,sr.type,sr.conversion,sr.made_in AS madeIn,sr.facility_id,sr.status,sr.location_id,sr.style_id,sr.profit_control_head_id,sr.buyer_id,sr.brand_id,sr.dmm_id,sr.technician_id,co.country_name,sr.life_cycle_status AS lifeCycleStatus,clr.colour')
    
    .addSelect(`l.location_name AS locationName,s.style,pch.profit_control_head AS pch,b.buyer_name AS buyerName,b.buyer_code AS buyerCode,br.brand_name AS brandName,ed1.first_name AS dmmName,ed2.first_name AS techName`)
    .leftJoin(Location, 'l', 'l.location_id = sr.location_id')
    .leftJoin(Style, 's', 's.style_id = sr.style_id')
    .leftJoin(ProfitControlHead, 'pch', 'pch.profit_control_head_id = sr.profit_control_head_id')
    .leftJoin(Buyers, 'b', 'b.buyer_id = sr.buyer_id')
    
    .leftJoin(Brands, 'br', 'br.brand_id = sr.brand_id')
    .leftJoin(EmplyeeDetails, 'ed1', 'ed1.employee_id = sr.dmm_id')
    .leftJoin(EmplyeeDetails, 'ed2', 'ed2.employee_id = sr.technician_id')
    .leftJoin(Countries, 'co', 'co.country_id= sr.made_in')
    .leftJoin(SampleReqFabricinfoEntity,'srfi','srfi.sample_request_id = sr.sample_request_id',)
    .leftJoin(Colour,'clr','clr.colour_id = srfi.colour_id')
    .leftJoin(SampleRequestTriminfoEntity,'srti','srti.sample_request_id = sr.sample_request_id')
    .leftJoin(M3ItemsEntity,'m3items','m3items.m3_items_Id  = srfi.fabric_code')
    .leftJoin(M3TrimsEntity,'m3trims','m3trims.m3_trim_Id = srti.trim_code')
    .leftJoin(StocksEntity,'st','st.buyer_id=sr.buyer_id')
    // .where('sr.life_cycle_status = :status', { status: 'MATERIAL_ISSUED' }) ;
     .where(`sr.life_cycle_status = "MATERIAL_ISSUED" AND sr.sample_request_id= ${req.id} `) ;

     return await query.getRawMany()

}
async getnoReq(req?: RequestNoReq): Promise<any> {
    const query = await this.createQueryBuilder('sr')
      .select(
        'sr.request_no AS requestNo','sr.sample_request_id AS sampleRequestId '
      )
      .leftJoin('buyers', 'b', 'b.buyer_id = sr.buyer_id')
      .leftJoin('style', 's', 's.style_id = sr.style_id')
      .leftJoin('profit_control_head', 'pr', 'pr.profit_control_head_id = sr.profit_control_head_id')
      .leftJoin('brands', 'br', 'br.brand_id = sr.brand_id')
      .leftJoin('sample_request_fabric_info', 'sf', 'sf.sample_request_id = sr.sample_request_id')
      .leftJoin('material_allocation', 'ma', 'ma.sample_item_id = sf.fabric_info_id')
      .leftJoin('material_allocation_items', 'mai', 'mai.material_allocation_id = ma.material_allocation_id')
      .leftJoin('m3_items', 'mi', 'mi.m3_items_Id = ma.m3_item_id')
      .leftJoin('colour', 'c', 'c.colour_id = sf.colour_id')
      .leftJoin('location', 'l', 'l.location_id = mai.location_id')
      .where('ma.item_type = :itemType', { itemType: 'fabric' })
      .andWhere('sr.life_cycle_status = :lifeCycleStatus', { lifeCycleStatus: 'MATERIAL_ISSUED' })
      .andWhere('sr.sample_request_id = :sampleRequestId', { sampleRequestId: req.requestNo })
      .getRawOne();
  
    return query;
  }
  
} 
