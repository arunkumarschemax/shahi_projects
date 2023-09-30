import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FabricRequestItemsEntity } from "../fabric-request-items.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FabricRequestItemsRepository extends Repository<FabricRequestItemsEntity> {

    constructor(@InjectRepository(FabricRequestItemsEntity)
         private FabricQualitiesRepo: Repository<FabricRequestItemsEntity>
    ) {
        super(FabricQualitiesRepo.target, FabricQualitiesRepo.manager, FabricQualitiesRepo.queryRunner);
    }
 

}