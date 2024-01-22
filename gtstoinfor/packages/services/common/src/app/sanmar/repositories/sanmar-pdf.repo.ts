import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SanmarPdfInfoEntity } from "../entity/sanmar-pdf.entity";
import { SanmarOrderFilter } from "@project-management-system/shared-models";




@Injectable()
export class SanmarPdfRepo extends Repository<SanmarPdfInfoEntity> {

    constructor(@InjectRepository(SanmarPdfInfoEntity) private SanPdfRepo: Repository<SanmarPdfInfoEntity>
    ) {
        super(SanPdfRepo.target, SanPdfRepo.manager, SanPdfRepo.queryRunner);
    }

    async getPDFInfo(req?:SanmarOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('co')
          .select(`*,DATE_FORMAT(co.created_at, '%m/%d/%Y %H:%i') as upload_date`);

          if(req.buyerPo !== undefined){
            query.andWhere(`co.buyer_po ='${req.buyerPo}'`) 
        }
        return await query.getRawMany();
      }

  
}