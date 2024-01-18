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
  

    async getPDFInfo(): Promise<any[]> {
        const query = this.createQueryBuilder('co')
          .select(`*,DATE_FORMAT(co.created_at, '%m/%d/%Y %H:%i') as upload_date`);
        return await query.getRawMany();
      }


}