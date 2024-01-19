import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SanmarOrdersEntity } from "../entity/sanmar-orders.entity";



@Injectable()
export class SanmarPdfRepo extends Repository<SanmarOrdersEntity> {

    constructor(@InjectRepository(SanmarOrdersEntity) private SanPdfRepo: Repository<SanmarOrdersEntity>
    ) {
        super(SanPdfRepo.target, SanPdfRepo.manager, SanPdfRepo.queryRunner);
    }
  
}