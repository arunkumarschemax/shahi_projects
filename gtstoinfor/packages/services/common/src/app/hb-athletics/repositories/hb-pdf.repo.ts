import { Injectable } from "@nestjs/common";
import { HbPdfFileInfoEntity } from "../entity/hb-pdf.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HbPoOrderFilter } from "@project-management-system/shared-models";



@Injectable()
export class HbPdfRepo extends Repository<HbPdfFileInfoEntity> {

    constructor(@InjectRepository(HbPdfFileInfoEntity) private HbPdfRepo: Repository<HbPdfFileInfoEntity>
    ) {
        super(HbPdfRepo.target, HbPdfRepo.manager, HbPdfRepo.queryRunner);
    }
  

    async getPDFInfo(req?:HbPoOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('co')
          .select(`*,DATE_FORMAT(co.created_at, '%m/%d/%Y %H:%i') as upload_date`);
          if(req.custPo !== undefined){
            query.andWhere(`co.cust_po ='${req.custPo}'`) 
        }
        return await query.getRawMany();
      }


}