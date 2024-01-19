import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SanmarOrdersEntity } from "../entity/sanmar-orders.entity";



@Injectable()
export class SanmarOrdersRepository extends Repository<SanmarOrdersEntity> {

    constructor(@InjectRepository(SanmarOrdersEntity) private SanOrdersRepo: Repository<SanmarOrdersEntity>
    ) {
        super(SanOrdersRepo.target, SanOrdersRepo.manager, SanOrdersRepo.queryRunner);
    }




    
}