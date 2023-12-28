import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colour } from '../../colours/colour.entity';
import { Style } from '../../style/dto/style-entity';
import { Indent } from '../indent-entity';
import { IndentFabricEntity } from '../indent-fabric-entity';
import { IndentTrimsEntity } from '../indent-trims-entity';
import { Buyers } from '../../buyers/buyers.entity';
import { FabricType } from '../../fabric-types/fabric-type.entity';
import { IndentRequestDto } from '@project-management-system/shared-models';
import { M3ItemsEntity } from '../../m3-items/m3-items.entity';
import { M3TrimsEntity } from '../../m3-trims/m3-trims.entity';

@Injectable()
export class IndentRepository extends Repository<Indent> {

    constructor(@InjectRepository(Indent) private indent: Repository<Indent>
    ) {
        super(indent.target, indent.manager, indent.queryRunner);
    }
    async getIndentData(req?: IndentRequestDto) {

        let query = this.createQueryBuilder(`i`)
            .select(`i.indent_id AS indentId,i.request_no AS requestNo ,s.style AS style, i.indent_date AS indentDate, i.expected_date AS expectedDate ,
            i.status AS STATUS,it.trim_type AS trimType,it.trim_code AS trimCode,it.quantity AS quantity,mt.trim_code AS m3TrimCode,
            ifa.ifabric_id AS fabricId, mi.item_code AS m3FabricCode,ifa.quantity AS fbquantity,c.colour AS color`)
            .leftJoin(IndentFabricEntity, 'ifa', 'ifa.indent_id = i.indent_id')
            .leftJoin(IndentTrimsEntity, 'it', 'it.indent_id = i.indent_id')
            .leftJoin(M3ItemsEntity,'mi','mi.m3_items_Id = ifa.m3_fabric_code')
            .leftJoin(Colour, 'c', 'c.colour_id = mi.color_id')
            .leftJoin(Style, 's', ' s.style_id =  i.style')
          .leftJoin (Buyers, 'b' , 'b.buyer_id = i.buyer_id')
          .leftJoin(M3TrimsEntity,'mt','mt.m3_trim_Id = it.trim_code')

            if (req.requestNo) {
                query.where(`i.request_no = '${req.requestNo}'`)
            }
            if(req?.extRefNo){
                  query.andWhere(` b.external_ref_number = '${req.extRefNo}'`)
            }
            
            if (req.confirmStartDate) {
                query.andWhere(`Date(indent_date) BETWEEN '${req.confirmStartDate}' AND '${req.confirmEndDate}'`)
            }
        
       
        // if (req.confirmStartDate !== undefined) {
        //     query.andWhere('i.indent_date BETWEEN :startDate AND :endDate', {
        //         startDate: req.confirmStartDate,
        //         endDate: req.confirmEndDate
        //     });
        // }
        
        query.groupBy(`i.indent_id`)
        console.log(query.getQuery(), "queryquery")
        return await query.getRawMany()
    }
    async getIndentDropDown() {
        const query = this.createQueryBuilder('i')
            .select(`i.request_no as requestNo , i.indent_date as indentDate`)
            .orderBy(`i.request_no,i.indent_date`)
        const data = await query.getRawMany()
        return data
    }
    async getAllIndentData(extRefNumber?:string) {
        const query = this.createQueryBuilder(`it`)
            .select(`b.buyer_id AS buyerId,b.buyer_name AS buyerName,b.external_ref_number as extRefNo,it.indent_id,it.request_no,it.indent_date,it.expected_date,it.status,it.created_at,it.updated_at,it.style as styleId,st.style,st.description `)
            .leftJoin(Style, 'st', 'st.style_id=it.style')
            .leftJoin(Buyers, 'b', 'b.buyer_id=it.buyer_id')
            if(extRefNumber){
                query.where(` b.external_ref_number = '${extRefNumber}'`)
            }
            query.orderBy(' it.expected_date','ASC')
        const data = await query.getRawMany()
        return data
    }

    //    async getAllData (){
    //     const query = this.createQueryBuilder(`it`)
    // .select (`it.request_no,it.style,it.indent_date,it.expected_date,ifc.m3_fabric_code,ifc.content,ifc.weight,ifc.width,ifc.yarn_count,ifc.construction,
    // ifc.finish,ifc.shrinkage,ifc.pch,ifc.moq,ifc.season,ifc.moq_price,ifc.grn_date,ifc.xl_no,ifc.quantity,,its.trim_type,its.size,
    // st.style,ft.fabric_type_name,co.colour,bu.buyer_name`)
    // .leftJoin(IndentTrimsEntity,'its','its.itrims_id=it.indent_id')
    //     .leftJoin(IndentFabricEntity,'ifc','ifc.ifabric_id=it.indent_id')
    //     .leftJoin(Style,'st','st.style_id=it.style')  
    //     .leftJoin(FabricType,'ft','ft.fabric_type_id=ifc.fabric_type')
    //     .leftJoin(Colour,'co','co.colour_id=ifc.color')
    //     .leftJoin(Buyers,'bu','bu.buyer_id=ifc.buyer_id')

    //     // LEFT JOIN `sampling_bom`sb ON sb.sample_request_id=sr.sample_request_id
    //     // .leftJoin`rm_items`rm ON rm.rm_item_id=srf.fabric_code
    //     // .leftJoin(SampleRequestTriminfoEntity,'srt','srt.material_issue_id = sr.material_issue_id')
    //     const data = await query.getRawMany()
    //     return data 
    // }
}