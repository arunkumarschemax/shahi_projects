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

@Injectable()
export class IndentRepository extends Repository<Indent> {

    constructor(@InjectRepository(Indent) private indent: Repository<Indent>
    ) {
        super(indent.target, indent.manager, indent.queryRunner);
    }
async getIndentData(){
    const query = this.createQueryBuilder(`i`)
    .select(`i.indent_id AS indentId,i.request_no As requestNo ,s.style AS style, i.indent_date AS indentDate, i.expected_date AS expectedDate ,i.status AS status,it.trim_type AS trimType,it.trim_code AS trimCode,it.quantity AS quantity,it.m3_trim_code AS m3TrimCode,ifa.ifabric_id AS fabricId,ifa.fabric_type AS fabricType, ifa.m3_fabric_code AS m3FabricCode,ifa.quantity AS fbquantity,c.colour AS color,ifa.content AS fabricType`)
    .leftJoin (IndentFabricEntity,'ifa','ifa.indent_id = i.indent_id')
    .leftJoin (IndentTrimsEntity,'it','it.indent_id = i.indent_id') 
    .leftJoin(Colour,'c','c.colour_id = it.color')
    .leftJoin(Style,'s',' s.style_id = i.style')
    .groupBy('i.indent_id')
    const data= await query.getRawMany()
    return data
}
 async getIndentDropDown(){
    const query = this.createQueryBuilder('i')
    .select(`i.request_no as requestNo , i.indent_date as indentDate`)
    .orderBy(`i.request_no,i.indent_date`)
    const data = await query.getRawMany()
    return data
 }
   

       async getAllData (){
        const query = this.createQueryBuilder(`it`)
        .select (`it.request_no,it.style,it.indent_date,it.expected_date,ifc.m3_fabric_code,ifc.content,ifc.weight,ifc.width,ifc.yarn_count,ifc.construction,
        ifc.finish,ifc.shrinkage,ifc.pch,ifc.moq,ifc.season,ifc.moq_price,ifc.grn_date,ifc.xl_no,ifc.quantity,
        st.style,ft.fabric_type_name,co.colour,bu.buyer_name`)
        .leftJoin(Style,'st','st.style_id=it.style')
        .leftJoin(IndentFabricEntity,'ifc','ifc.ifabric_id=it.indent_id')
        .leftJoin(FabricType,'ft','ft.fabric_type_id=ifc.fabric_type')
        .leftJoin(Colour,'co','co.colour_id=ifc.color')
        .leftJoin(Buyers,'bu','bu.buyer_id=ifc.buyer_id')
        // LEFT JOIN `sampling_bom`sb ON sb.sample_request_id=sr.sample_request_id
        // .leftJoin`rm_items`rm ON rm.rm_item_id=srf.fabric_code
        // .leftJoin(SampleRequestTriminfoEntity,'srt','srt.material_issue_id = sr.material_issue_id')
        const data = await query.getRawMany()
        return data 
    }
}