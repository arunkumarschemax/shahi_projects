import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SanmarOrdersEntity } from "../entity/sanmar-orders.entity";



@Injectable()
export class SanmarPdfRepo extends Repository<SanmarOrdersEntity> {

    constructor(@InjectRepository(SanmarOrdersEntity) private SanPdfRepo: Repository<SanmarOrdersEntity>
    ) {
        super(SanPdfRepo.target, SanPdfRepo.manager, SanPdfRepo.queryRunner);
    }

    async getPDFInfo(): Promise<any[]> {
        const query = this.createQueryBuilder('co')
          .select(`*,DATE_FORMAT(co.created_at, '%m/%d/%Y %H:%i') as upload_date`);
        return await query.getRawMany();
      }

  
}