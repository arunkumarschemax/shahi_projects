import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StyleEntity } from "../entittes/style-entity";
import { StyleDto } from "./style-dto";
import { BomEntity } from "../entittes/bom-entity";
import { StyleComboEntity } from "../entittes/style-combo-entity";
import { StyleNumberDto } from "./style-number-dto";
import { DpomEntity } from "../../dpom/entites/dpom.entity";
import { BomDataForStyleAndSeasonModel } from "@project-management-system/shared-models";


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

    async getBomInfoAgainstStyle(req: StyleNumberDto): Promise<any[]> {
        const query = this.createQueryBuilder('sty')
            .select(`trim_info as trimInfo,plant,style_type as styleType,geo_code,po_number,destination_country,sty.msc,sty.id as styleId,sty.style,sty.style_name,sty.season,bom.item_name,bom.description,bom.im_code,bom.item_type,bom.use,stco.combination,stco.primary_color,stco.secondary_color,stco.logo_color,bom.id as bomId,stco.id as styleComboId,stco.color,bom.uom,bom.qty,dpom.po_number,dpom.item,gender,dpom.ship_to_address_legal_po`)
            .leftJoin(BomEntity, 'bom', `bom.style_id = sty.id`)
            .leftJoin(StyleComboEntity, 'stco', `stco.bom_id = bom.id`)
            .leftJoin(DpomEntity, 'dpom', `dpom.style_number = sty.style`)
            .where('sty.style IN (:...styles) AND bom.item_name = :trimName', {
                styles: req.style,
                trimName: req.trimName
            });
        return await query.getRawMany()

    }

    async getBomDataForStyleAndSeason(req : {style : string,season : string,year:string}):Promise<BomDataForStyleAndSeasonModel[]>{
        const concatenatedSeason = req.season + req.year.slice(2);
        const query= this.createQueryBuilder('s')
        .select(`b.style_id as styleId,b.id AS bomId,b.item_name AS itemName,b.description,b.im_code AS imCode,b.item_type AS itemType,sc.id AS styleComboId,sc.combination,sc.primary_color AS primaryColor,sc.secondary_color AS secondaryColor,sc.logo_color AS logoColor,sc.color,b.item_id as itemId,s.style`)
        .leftJoin(BomEntity,'b','b.style_id = b.id')
        .leftJoin(StyleComboEntity,'sc','sc.bom_id=b.id')
        .where(`s.style='${req.style}' and s.season='${concatenatedSeason}'`)
        const data = await query.getRawMany()

        const mappedResult: BomDataForStyleAndSeasonModel[] = data.map(item => ({
            styleId: item.styleId,
            bomId: item.bomId,
            itemName: item.itemName,
            description: item.description,
            imCode: item.imCode,
            itemType: item.itemType,
            styleComboId: item.styleComboId,
            combination: item.combination,
            primaryColor: item.primaryColor,
            secondaryColor: item.secondaryColor,
            logoColor: item.logoColor,
            color: item.color,
            itemId : item.itemId
        }));
    
        return mappedResult;
    }

}