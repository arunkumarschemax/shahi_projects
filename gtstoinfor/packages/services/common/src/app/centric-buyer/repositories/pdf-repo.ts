import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CentricPdfFileUploadEntity } from "../entity/centric-pdf-file.entity";
import { centricOrderHistory } from "@project-management-system/shared-models";


@Injectable()
export class CentricPdfRepository extends Repository<CentricPdfFileUploadEntity> {

    constructor(@InjectRepository(CentricPdfFileUploadEntity) private CentricPdfRepo: Repository<CentricPdfFileUploadEntity>
    ) {
        super(CentricPdfRepo.target, CentricPdfRepo.manager, CentricPdfRepo.queryRunner);
    }


    async getPdfFileInfo(req?:centricOrderHistory): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`*,DATE_FORMAT(o.created_at, '%m/%d/%Y %H:%i') as upload_date`)
            if(req.poNumber !== undefined){
                query.andWhere(`o.po_number ='${req.poNumber}'`) 
            }
          
        return await query.getRawMany()
    }

    


}