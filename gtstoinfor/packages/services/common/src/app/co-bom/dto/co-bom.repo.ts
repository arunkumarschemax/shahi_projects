import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoBom } from "../co-bom.entity";
import { FgItemBom } from "../../substituion/fg-item-bom.entity";


@Injectable()
export class CoBomRepository extends Repository<CoBom>{
    constructor(@InjectRepository(CoBom) private CoRepo: Repository<CoBom>
    ) {
        super(CoRepo.target, CoRepo.manager, CoRepo.queryRunner);
    }


    async getBomagainstitem(rmSkuId:number):Promise<any>{
        const query = await this.createQueryBuilder('i')
        .select('i.id,i.quantity,i.coNumber,i.coLineNumber,i.fgSku,i.co_id,Fg.fgItemBomId,Fg.fgSkuId,Fg.rmItemCode,Fg.rmSkuId,Fg.consumption,Fg.itemTypeId.Fg.itemGroupeId,Fg.itemType,Fg.rm_item_id')
        .leftJoin(FgItemBom,'Fg','Fg.fgItemBomId= i.fgItemBomId')
        .where(`Fg.rmSkuId ='${rmSkuId}'`)
        return query.getRawMany
    }
}