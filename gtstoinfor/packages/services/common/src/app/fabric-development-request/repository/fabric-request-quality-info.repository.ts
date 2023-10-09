import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FabricRequestQualitiesInfoEntity } from "../fabric-request-quality-info.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FabricRequestQualityInfoRepository extends Repository<FabricRequestQualitiesInfoEntity> {

    constructor(@InjectRepository(FabricRequestQualitiesInfoEntity) private FabricQualitiesInfoRepo: Repository<FabricRequestQualitiesInfoEntity>
    ) {
        super(FabricQualitiesInfoRepo.target, FabricQualitiesInfoRepo.manager, FabricQualitiesInfoRepo.queryRunner);
    }
 

}