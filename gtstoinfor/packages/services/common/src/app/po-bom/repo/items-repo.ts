import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PoBomEntity } from "../entittes/po-bom.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomEntity } from "../../dpom/entites/dpom.entity";
import { BomEntity } from "../entittes/bom-entity";
import { BomProposalDataModel, BomProposalReq } from "@project-management-system/shared-models";
import { ItemEntity } from "../entittes/item-entity";

@Injectable()
export class ItemsRepo extends Repository<ItemEntity> {
    constructor(@InjectRepository(ItemEntity) private itemsRepo: Repository<ItemEntity>
    ) {
        super(itemsRepo.target, itemsRepo.manager, itemsRepo.queryRunner);
    }

   
}