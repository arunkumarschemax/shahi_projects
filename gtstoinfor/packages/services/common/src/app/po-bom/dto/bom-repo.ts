import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BomEntity } from "../entittes/bom-entity";
import { StyleComboEntity } from "../entittes/style-combo-entity";


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
}