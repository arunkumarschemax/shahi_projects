import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StyleEntity } from "../entittes/style-entity";
import { StyleDto } from "./style-dto";
import { BomEntity } from "../entittes/bom-entity";
import { StyleComboEntity } from "../entittes/style-combo-entity";
import { StyleNumberDto } from "./style-number-dto";


@Injectable()
export class StyleRepo extends Repository<StyleEntity> {
    constructor(@InjectRepository(StyleEntity) private styleRepo: Repository<StyleEntity>
    ) {
        super(styleRepo.target, styleRepo.manager, styleRepo.queryRunner);
    }

    async getStyelsData(): Promise<any[]> {
        const queryBuilder = this.createQueryBuilder('s')
        .select(`id,style, style_name AS styleName,season,exp_no AS expNo,msc,s.factory_lo as factoryLo,status,file_data as fileData,null as bomData`)
        return await queryBuilder.getRawMany()
    }

    async getBomInfoAgainstStyle(req:StyleNumberDto):Promise<any[]>{
        const query = this.createQueryBuilder('sty')
        .select(`sty.id as styleId,sty.style,sty.style_name,bom.item_name,bom.description,bom.im_code,bom.item_type,bom.use,stco.combination,stco.primary_color,stco.secondary_color,stco.logo_color,bom.id as bomId,stco.id as styleComboId,stco.color,bom.uom,bom.qty`)
        .leftJoin(BomEntity,'bom',`bom.style_id = sty.id`)
        .leftJoin(StyleComboEntity,'stco',`stco.bom_id = bom.id`)
        .where(`sty.style = '${req.style}'`)
        return await query.getRawMany()

    }
}