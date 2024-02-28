import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PoBomEntity } from "../entittes/po-bom.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomEntity } from "../../dpom/entites/dpom.entity";
import { BomEntity } from "../entittes/bom-entity";
import { BomProposalDataModel, BomProposalReq } from "@project-management-system/shared-models";
import { ItemEntity } from "../entittes/item-entity";
import { DestinationEntity } from "../entittes/destination-entity";

@Injectable()
export class DestinationsRepo extends Repository<DestinationEntity> {
    constructor(@InjectRepository(DestinationEntity) private destinationsRepo: Repository<DestinationEntity>
    ) {
        super(destinationsRepo.target, destinationsRepo.manager, destinationsRepo.queryRunner);
    }

   
}