import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FabricRequestEntity } from "../fabric-request.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FabricRequestRepository extends Repository<FabricRequestEntity> {

    constructor(@InjectRepository(FabricRequestEntity) private FabricRepo: Repository<FabricRequestEntity>
    ) {
        super(FabricRepo.target, FabricRepo.manager, FabricRepo.queryRunner);
    }
 

}