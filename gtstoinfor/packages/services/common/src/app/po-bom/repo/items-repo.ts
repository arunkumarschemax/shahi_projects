import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PoBomEntity } from "../entittes/po-bom.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomEntity } from "../../dpom/entites/dpom.entity";
import { BomEntity } from "../entittes/bom-entity";
import { BomProposalDataModel, BomProposalReq } from "@project-management-system/shared-models";
import { ItemEntity } from "../entittes/item-entity";
import { StyleEntity } from "../entittes/style-entity";

@Injectable()
export class ItemsRepo extends Repository<ItemEntity> {
    constructor(@InjectRepository(ItemEntity) private itemsRepo: Repository<ItemEntity>
    ) {
        super(itemsRepo.target, itemsRepo.manager, itemsRepo.queryRunner);
    }
    
    async getTrimListForBomGenration(styleReq: string[]): Promise<any[]> {
        const queryBuilder = this.createQueryBuilder('i')
            .select(`*,s.style`)
            .leftJoin(BomEntity, 'b', 'b.item_id = i.item_id')
            .leftJoin(StyleEntity, 's', 's.id = b.style_id')
            .where(`s.style IN (:...style)`, { style: styleReq })
            .andWhere(`i.isActive = true AND i.consumptionRequired = "DESC"`)
            .groupBy('i.item');
        return await queryBuilder.getRawMany();
    }
    
   
}