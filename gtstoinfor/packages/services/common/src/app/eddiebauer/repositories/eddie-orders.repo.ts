import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { EddieOrdersEntity } from "../entities/eddie-orders.entity";



@Injectable()
export class EddieOrdersRepository extends Repository<EddieOrdersEntity> {

    constructor(@InjectRepository(EddieOrdersEntity) private EddieOrdersRepo: Repository<EddieOrdersEntity>
    ) {
        super(EddieOrdersRepo.target, EddieOrdersRepo.manager, EddieOrdersRepo.queryRunner);
    }

  
    
}