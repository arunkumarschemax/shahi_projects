import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StyleComboEntity } from "../entittes/style-combo-entity";


@Injectable()
export class StyleComboRepo extends Repository<StyleComboEntity> {
    constructor(@InjectRepository(StyleComboEntity) private styleComboRepo: Repository<StyleComboEntity>
    ) {
        super(styleComboRepo.target, styleComboRepo.manager, styleComboRepo.queryRunner);
    }

    async getStyleComboData(bomId:number): Promise<any[]> {
        const queryBuilder = this.createQueryBuilder('sc')
        .select(`id AS styleComboId,bom_id AS bomId,style_id AS sstyleId,combination,primary_color AS primaryColor,secondary_color AS secondaryColor,logo_color AS logoColor,color`)
        .where(`bom_id=${bomId}`)
        return await queryBuilder.getRawMany()
    }
}