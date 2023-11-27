import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Style } from './style-entity';
import { AllStyleResponseModel } from '@project-management-system/shared-models';

@Injectable()
export class StyleRepository extends Repository<Style> {
    public dataSource: DataSource
    constructor(@InjectRepository(Style) private style: Repository<Style>
    ) {
        super(style.target, style.manager, style.queryRunner);
        
    }

    async getAllStyleData():Promise<any>{
        const manager = this.dataSource;
        const query = "SELECT s.style_id AS styleId,s.location_id AS locationId,pf.profit_control_head AS pch, s.style, b.buyer_name AS buyer, s.is_active AS isActive, s.style_file_name AS styleFileName, s.style_file_path AS styleFilePath, s.description AS description, s.created_user AS createdUser, s.version_flag AS versionFlag, s.updated_user AS updatedUser, s.updated_at AS updatedAt, s.created_at AS createdAt from styles s left join   pf on pf.profit_control_head_id = s.pch left join buyers b on b.buyer_id = s.buyer_i";
        let data = await manager.query(query);
        console.log(data);
        if(data.length > 0){
            return data;
        }

    }

   
}