import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Indent } from '../indent-entity';
import { Style } from '../../style/dto/style-entity';
import { IndentFabricEntity } from '../indent-fabric-entity';
import { FabricType } from '../../fabric-types/fabric-type.entity';
import { Colour } from '../../colours/colour.entity';
import { Buyers } from '../../buyers/buyers.entity';

@Injectable()
export class IndentRepository extends Repository<Indent> {

    constructor(@InjectRepository(Indent) private indent: Repository<Indent>
    ) {
        super(indent.target, indent.manager, indent.queryRunner);
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