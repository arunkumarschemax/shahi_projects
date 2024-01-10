import { Injectable } from "@nestjs/common";
import { HbPdfFileInfoEntity } from "../entity/hb-pdf.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";



@Injectable()
export class HbPdfRepo extends Repository<HbPdfFileInfoEntity> {

    constructor(@InjectRepository(HbPdfFileInfoEntity) private HbPdfRepo: Repository<HbPdfFileInfoEntity>
    ) {
        super(HbPdfRepo.target, HbPdfRepo.manager, HbPdfRepo.queryRunner);
    }

    


}