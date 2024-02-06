import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PdfFileUploadEntity } from "../entities/pdf-file-upload.entity";

@Injectable()
export class PdfFileUploadRepository extends Repository<PdfFileUploadEntity> {

    constructor(@InjectRepository(PdfFileUploadEntity) private pdfRepository: Repository<PdfFileUploadEntity>
    ) {
        super(pdfRepository.target, pdfRepository.manager, pdfRepository.queryRunner);
    }
   
    async getBuyerPoNumber(): Promise<any[]> {
        const query = this.createQueryBuilder('co')
            .select(`DISTINCT co.po_number`)
        return await query.getRawMany();
    }

}