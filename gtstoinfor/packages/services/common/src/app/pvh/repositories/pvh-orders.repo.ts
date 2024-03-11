import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PVHOrdersEntity } from "../entities/pvh-orders.entity";



@Injectable()
export class PVHOrdersRepository extends Repository<PVHOrdersEntity> {

    constructor(@InjectRepository(PVHOrdersEntity) private PvhOrdersRepo: Repository<PVHOrdersEntity>
    ) {
        super(PvhOrdersRepo.target, PvhOrdersRepo.manager, PvhOrdersRepo.queryRunner);
    }

}