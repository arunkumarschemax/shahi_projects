import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { EddiePdfInfoEntity } from "../entities/eddie-pdf.entity";




@Injectable()
export class EddiePdfRepo extends Repository<EddiePdfInfoEntity> {

    constructor(@InjectRepository(EddiePdfInfoEntity) private EddiePdfRepo: Repository<EddiePdfInfoEntity>
    ) {
        super(EddiePdfRepo.target, EddiePdfRepo.manager, EddiePdfRepo.queryRunner);
    }

 
  
}