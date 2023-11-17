import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SampleInventoryLogEntity } from "../entities/sample-inventory-log-entity";

@Injectable()
export class SampleInventoryLoqRepo extends Repository<SampleInventoryLogEntity> {
    constructor(@InjectRepository(SampleInventoryLogEntity) 
    private repo: Repository<SampleInventoryLogEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);

    }
}