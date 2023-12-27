import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CentricPdfFileUploadEntity } from "../entity/centric-pdf-file.entity";
import { CentricCOLineEntity } from "../entity/centric-co-line.entity";


@Injectable()
export class CentricCOLineRepository extends Repository<CentricCOLineEntity> {

    constructor(@InjectRepository(CentricCOLineEntity) private CentricPdfRepo: Repository<CentricCOLineEntity>
    ) {
        super(CentricPdfRepo.target, CentricPdfRepo.manager, CentricPdfRepo.queryRunner);
    }

    


}