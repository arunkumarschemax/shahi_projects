import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Indent } from '../indent-entity';
import { IndentFabricEntity } from '../indent-fabric-entity';
import { IndentTrimsEntity } from '../indent-trims-entity';
import { groupBy } from 'rxjs';
import { Colour } from '../../colours/colour.entity';
import { Style } from '../../style/dto/style-entity';

@Injectable()
export class IndentRepository extends Repository<Indent> {

    constructor(@InjectRepository(Indent) private indent: Repository<Indent>
    ) {
        super(indent.target, indent.manager, indent.queryRunner);
    }
async getIndentData(){
    const query = this.createQueryBuilder(`i`)
    .select(`i.indent_id AS indentId,i.request_no As requestNo ,s.style AS style, i.indent_date AS indentDate, i.expected_date AS expectedDate ,i.status AS status,it.trim_type AS trimType,it.trim_code AS trimCode,it.quantity AS quantity,it.m3_trim_code AS m3TrimCode,ifa.ifabric_id AS fabricId,ifa.fabric_type AS fabricType, ifa.m3_fabric_code AS m3FabricCode,ifa.quantity AS fbquantity,c.colour AS color`)
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
   
}