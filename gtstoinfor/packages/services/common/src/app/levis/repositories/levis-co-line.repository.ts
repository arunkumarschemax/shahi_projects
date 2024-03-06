import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LevisCOLineEntity } from "../entities/levis-co-line.entity";
import { LevisOrderFilter } from "packages/libs/shared-models/src/common/levis";


@Injectable()
export class LevisCOLineRepository extends Repository<LevisCOLineEntity> {

    constructor(@InjectRepository(LevisCOLineEntity) private levisCoLineRepository: Repository<LevisCOLineEntity>
    ) {
        super(levisCoLineRepository.target, levisCoLineRepository.manager, levisCoLineRepository.queryRunner);
    }

    async getCoLineData(req: LevisOrderFilter): Promise<any[]> {
      const query = this.createQueryBuilder('co')
        .select(`DISTINCT co.po_number,co.po_line,co.material,co.co_date, co.item_no, co.status, co.error_msg,
                 DATE_FORMAT(co.created_at, '%m/%d/%Y %H:%i') as raised_date, co.created_user, co.co_number,co.id`);
  
      if (req.poNumber !== undefined) {
        query.andWhere(`co.po_number = :poNumber`, { poNumber: req.poNumber });
      }
      if (req.itemNo !== undefined) {
        query.andWhere(`co.item_no = :itemNo`, { itemNo: req.itemNo });
      }
    //   if(req.style !== undefined){
    //     query.andWhere(`co.style LIKE :style`, { style: `%${req.style}%` });
    // }
  //   if (req.deliveryDateStartDate !== undefined) {
  //     query.andWhere(`STR_TO_DATE(co.delivery_date, '%Y-%m-%d') BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
  // }
   
    

    if (req.coNumber !== undefined) {
      query.andWhere(`co.co_number LIKE :coNumber`, { coNumber: `%${req.coNumber}%` });
  }
  
      return await query.getRawMany();
    }






    async getCoPoNumber(): Promise<any[]> {
        const query = this.createQueryBuilder('co')
            .select(`co.id,co.po_number`)
            .groupBy(`co.po_number`)
        //  .where(`buyer_po <> NULL`)
        return await query.getRawMany();
    }
    async getItem(): Promise<any[]> {
        const query = this.createQueryBuilder('co')
            .select(`co.id,co.item_no`)
            .groupBy(`co.item_no`)
        //  .where(`item_no <> NULL`)
        return await query.getRawMany();
    }
   

    async getDataforCOLineCreation(): Promise<any[]> {
        const query = this.createQueryBuilder('co')
            .select(`co.id, co.po_number, co.item_no, co.buyer,co.po_line`)
            .where(` status != 'Success' AND status != 'Inprogress' AND is_active = true`)
            .orderBy(` created_at`, 'ASC')
        return await query.getRawMany();
    }

    async getDataforCOLineEdit(): Promise<any[]> {
      const query = this.createQueryBuilder('co')
          .select(`co.id, co.po_number, co.item_no, co.buyer,co.po_line,co.co_number`)
          .where(` status != 'Open' AND status != 'Failed' AND is_active = true`)
          .orderBy(` created_at`, 'ASC')
      return await query.getRawMany();
  }



    
}