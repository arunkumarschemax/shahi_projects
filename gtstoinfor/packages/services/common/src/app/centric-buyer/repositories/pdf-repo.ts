import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CentricPdfFileUploadEntity } from "../entity/centric-pdf-file.entity";


@Injectable()
export class CentricPdfRepository extends Repository<CentricPdfFileUploadEntity> {

    constructor(@InjectRepository(CentricPdfFileUploadEntity) private CentricPdfRepo: Repository<CentricPdfFileUploadEntity>
    ) {
        super(CentricPdfRepo.target, CentricPdfRepo.manager, CentricPdfRepo.queryRunner);
    }

    


}