import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LevisPdfInfoEntity } from "../entities/levis-pdf.entity";




@Injectable()
export class LevisPdfRepo extends Repository<LevisPdfInfoEntity> {

    constructor(@InjectRepository(LevisPdfInfoEntity) private LevisPdfRepo: Repository<LevisPdfInfoEntity>
    ) {
        super(LevisPdfRepo.target, LevisPdfRepo.manager, LevisPdfRepo.queryRunner);
    }
 
 
  
}