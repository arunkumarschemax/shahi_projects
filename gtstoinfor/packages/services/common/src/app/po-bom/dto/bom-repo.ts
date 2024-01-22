import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BomEntity } from "../entittes/bom-entity";


@Injectable()
export class BomRepo extends Repository<BomEntity> {
    constructor(@InjectRepository(BomEntity) private bomRepo: Repository<BomEntity>
    ) {
        super(bomRepo.target, bomRepo.manager, bomRepo.queryRunner);
    }

    async getBomData(styleId:number): Promise<any[]> {
        const queryBuilder = this.createQueryBuilder('s')
        .select(`style_id as styleId,id AS bomId,item_name AS itemName,DESCRIPTION,im_code AS imCode,item_type AS itemType`)
        .where(`style_id=${styleId}`)
        return await queryBuilder.getRawMany()
    }
}