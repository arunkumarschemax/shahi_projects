import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Style } from './style-entity';
import { ProfitControlHead } from '../../profit-control-head/profit-control-head-entity';
import {Location} from '../../locations/location.entity'

@Injectable()
export class StyleRepository extends Repository<Style> {

    constructor(@InjectRepository(Style) private style: Repository<Style>
    ) {
        super(style.target, style.manager, style.queryRunner);
    }
   
    async getAllActiveStyle():Promise<any>{       
        const query = await this.createQueryBuilder('st')
        .select(`st.style_id as styleId,st.location_id as locationId ,st.pch as profitControlHeadId,st.description as description,lo.location_name as locationName,pch.profit_control_head as profitControlHead,st.style_file_name as styleFileName,st.style_file_path as styleFilePath,st.style,st.is_active as isActive,st.version_flag as versionFlag`)
        .leftJoin(Location,'lo',`lo.location_id = st.location_id `)
        .leftJoin(ProfitControlHead,'pch',`pch.profit_control_head_id = st.pch` )
       
        return query.getRawMany()
    }

}