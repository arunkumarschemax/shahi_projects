import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BomEntity } from "../entittes/bom-entity";
import { StyleComboEntity } from "../entittes/style-combo-entity";
import { BomDataForStyleAndSeasonModel } from "@project-management-system/shared-models";


@Injectable()
export class BomRepo extends Repository<BomEntity> {
    constructor(@InjectRepository(BomEntity) private bomRepo: Repository<BomEntity>
    ) {
        super(bomRepo.target, bomRepo.manager, bomRepo.queryRunner);
    }

    async getBomData(styleId:number): Promise<any[]> {
        const queryBuilder = this.createQueryBuilder('s')
        .select(`style_id as styleId,id AS bomId,item_name AS itemName,description,im_code AS imCode,item_type AS itemType`)
        .where(`style_id=${styleId}`)
        return await queryBuilder.getRawMany()
    }
    async getAllBomData(styleId:number):Promise<any[]>{
        const query= this.createQueryBuilder('s')
        .select(`s.style_id as styleId,s.id AS bomId,s.item_name AS itemName,s.description,s.im_code AS imCode,s.item_type AS itemType,sc.id AS styleComboId,sc.combination,sc.primary_color AS primaryColor,sc.secondary_color AS secondaryColor,sc.logo_color AS logoColor,sc.color`)
        .leftJoin(StyleComboEntity,'sc','sc.bom_id=s.id')
        .where(`s.style_id=${styleId}`)
        return await query.getRawMany()
    }

    async getBomDataForStyleAndSeason(req : {style : string,season : string,year:string}):Promise<BomDataForStyleAndSeasonModel[]>{
        const concatenatedSeason = req.season + req.year.slice(2);
        const query= this.createQueryBuilder('s')
        .select(`s.style_id as styleId,s.id AS bomId,s.item_name AS itemName,s.description,s.im_code AS imCode,s.item_type AS itemType,sc.id AS styleComboId,sc.combination,sc.primary_color AS primaryColor,sc.secondary_color AS secondaryColor,sc.logo_color AS logoColor,sc.color`)
        .leftJoin(StyleComboEntity,'sc','sc.bom_id=s.id')
        .where(`s.style=${req.style} and s.season=${concatenatedSeason}`)
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
            color: item.color
        }));
    
        return mappedResult;
    }

    
}