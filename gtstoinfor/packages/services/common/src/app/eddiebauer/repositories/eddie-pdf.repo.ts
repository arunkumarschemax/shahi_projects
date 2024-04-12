import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { EddiePdfInfoEntity } from "../entities/eddie-pdf.entity";
import { EddieOrderFilter } from "@project-management-system/shared-models";




@Injectable()
export class EddiePdfRepo extends Repository<EddiePdfInfoEntity> {

    constructor(@InjectRepository(EddiePdfInfoEntity) private EddiePdfRepo: Repository<EddiePdfInfoEntity>
    ) {
        super(EddiePdfRepo.target, EddiePdfRepo.manager, EddiePdfRepo.queryRunner);
    }
 
    async getPDFInfo(req?:EddieOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('co')
          .select(`*,DATE_FORMAT(co.created_at, '%m/%d/%Y %H:%i') as upload_date`);

          if(req.poNumber!== undefined){
            query.andWhere(`co.po_number ='${req.poNumber}'`) 
        }
        return await query.getRawMany();
      }
 
  
}