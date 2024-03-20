import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PvhPdfInfoEntity } from "../entities/pvh-pdf.entity";



@Injectable()
export class PvhPdfRepo extends Repository<PvhPdfInfoEntity> {

  constructor(@InjectRepository(PvhPdfInfoEntity) private pvhPdfRepo: Repository<PvhPdfInfoEntity>
  ) {
    super(pvhPdfRepo.target, pvhPdfRepo.manager, pvhPdfRepo.queryRunner);
  }

  async getPdfFileInfo(req: any): Promise<any[]> {
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
