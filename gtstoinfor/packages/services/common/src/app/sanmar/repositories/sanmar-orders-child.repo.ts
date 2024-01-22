import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SanmarOrderschildEntity } from "../entity/sanmar-orders-child";



@Injectable()
export class SanmarOrdersChildRepository extends Repository<SanmarOrderschildEntity> {

    constructor(@InjectRepository(SanmarOrderschildEntity) private SanOrdersChildRepo: Repository<SanmarOrderschildEntity>
    ) {
        super(SanOrdersChildRepo.target, SanOrdersChildRepo.manager, SanOrdersChildRepo.queryRunner);
    }

    
}