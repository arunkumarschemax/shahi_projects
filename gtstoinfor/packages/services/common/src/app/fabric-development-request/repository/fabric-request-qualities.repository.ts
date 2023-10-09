import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FabricRequestQualitiesEntity } from "../fabric-request-qualities.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FabricRequestQualitiesRepository extends Repository<FabricRequestQualitiesEntity> {

    constructor(@InjectRepository(FabricRequestQualitiesEntity)
         private FabricQualitiesRepo: Repository<FabricRequestQualitiesEntity>
    ) {
        super(FabricQualitiesRepo.target, FabricQualitiesRepo.manager, FabricQualitiesRepo.queryRunner);
    }
 

}