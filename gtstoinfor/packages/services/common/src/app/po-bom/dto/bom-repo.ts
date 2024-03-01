import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BomEntity } from "../entittes/bom-entity";
import { StyleComboEntity } from "../entittes/style-combo-entity";
import { BomCreationFiltersReq, BomDataForStyleAndSeasonModel } from "@project-management-system/shared-models";
import { StyleEntity } from "../entittes/style-entity";
import { DpomEntity } from "../../dpom/entites/dpom.entity";


@Injectable()
export class BomRepo extends Repository<BomEntity> {
    constructor(@InjectRepository(BomEntity) private bomRepo: Repository<BomEntity>
    ) {
        super(bomRepo.target, bomRepo.manager, bomRepo.queryRunner);
    }

    async getBomData(styleId: number): Promise<any[]> {
        const queryBuilder = this.createQueryBuilder('s')
            .select(`style_id as styleId,id AS bomId,item_name AS itemName,description,im_code AS imCode,item_type AS itemType`)
            .where(`style_id=${styleId}`)
        return await queryBuilder.getRawMany()
    }
    async getAllBomData(styleId: number): Promise<any[]> {
        const query = this.createQueryBuilder('s')
            .select(`s.style_id as styleId,s.id AS bomId,s.item_name AS itemName,s.description,s.im_code AS imCode,s.item_type AS itemType,sc.id AS styleComboId,sc.combination,sc.primary_color AS primaryColor,sc.secondary_color AS secondaryColor,sc.logo_color AS logoColor,sc.color`)
            .leftJoin(StyleComboEntity, 'sc', 'sc.bom_id=s.id')
            .where(`s.style_id=${styleId}`)
        return await query.getRawMany()
    }

    async getBomDataForStyleAndSeason(req: { style: string, season: string, year: string }): Promise<BomDataForStyleAndSeasonModel[]> {
        const concatenatedSeason = req.season + req.year.slice(2);
        const query = this.createQueryBuilder('s')
            .select(`s.style_id as styleId,s.id AS bomId,s.item_name AS itemName,s.description,s.im_code AS imCode,s.item_type AS itemType,s.item_id as itemId`)
            .leftJoin(StyleEntity, `st`, `st.id = s.style_id`)
            .where(`st.style='${req.style}' and st.season='${req.season}' and st.year = '${req.year}'`)
        const data = await query.getRawMany()

        const mappedResult: any[] = data.map(item => ({
            styleId: item.styleId,
            bomId: item.bomId,
            itemName: item.itemName,
            description: item.description,
            imCode: item.imCode,
            itemType: item.itemType,
            itemId: item.itemId
        }));

        return mappedResult;
    }

    async getProposalsData() {
        const query = this.createQueryBuilder('b')
        .select('b.id,b.po_qty,b.bom_qty,b.consumption,b.wastage,b.moq,')
        .leftJoin(DpomEntity,'d','d.id = b.dpom_id')
        .leftJoin(BomEntity,'b')

    }
   
    

}