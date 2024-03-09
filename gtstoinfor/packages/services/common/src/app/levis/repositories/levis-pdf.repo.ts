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
 

    async getPDFInfo(req:any): Promise<any[]> {
        const query = this.createQueryBuilder('co')
          .select(`*,DATE_FORMAT(co.created_at, '%m/%d/%Y %H:%i') as upload_date`);
          if (req.poNumber !== undefined) {
            query.andWhere(`co.po_number ='${req.poNumber}'`)
        }
          
        return await query.getRawMany();
      }

 
      async getHistoryPoNumber(): Promise<any[]> {
        const query = this.createQueryBuilder('co')
            .select(`DISTINCT po_number`)
        
        return await query.getRawMany()
    }
  
}