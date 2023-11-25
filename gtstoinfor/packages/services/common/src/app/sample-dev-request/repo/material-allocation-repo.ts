import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { MaterialAllocationEntity } from "../entities/material-allocation.entity";

@Injectable()
export class MaterialAllocationRepo extends Repository<MaterialAllocationEntity> {
    constructor(@InjectRepository(MaterialAllocationEntity) 
    private materialalloctionrepo: Repository<MaterialAllocationEntity>
    ) {
        super(materialalloctionrepo.target, materialalloctionrepo.manager, materialalloctionrepo.queryRunner);
    }
  


   
}