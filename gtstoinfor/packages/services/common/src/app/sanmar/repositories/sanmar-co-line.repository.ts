import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HbPoOrderFilter, hbCoLineRequest } from "packages/libs/shared-models/src/common/hb-athletic";
import { SanmarCOLineEntity } from "../entity/sanmar-co-line.entity";
import { SanmarOrderFilter } from "packages/libs/shared-models/src/common/sanmar/sanmar-order-filter";


@Injectable()
export class SanmarCOLineRepository extends Repository<SanmarCOLineEntity> {

    constructor(@InjectRepository(SanmarCOLineEntity) private sanmarCoLineRepository: Repository<SanmarCOLineEntity>
    ) {
        super(sanmarCoLineRepository.target, sanmarCoLineRepository.manager, sanmarCoLineRepository.queryRunner);
    }

    async getSanmarCoLineData(req: SanmarOrderFilter): Promise<any[]> {
      const query = this.createQueryBuilder('co')
        .select(`DISTINCT co.buyer_po, co.delivery_date, co.co_date, co.style, co.item_no, co.status, co.error_msg,
                 DATE_FORMAT(co.created_at, '%m/%d/%Y %H:%i') as raised_date, co.created_user, co.co_number`);
  
      if (req.buyerPo !== undefined) {
        query.andWhere(`co.buyer_po = :buyerPo`, { buyerPo: req.buyerPo });
      }
      if (req.itemNo !== undefined) {
        query.andWhere(`co.item_no = :itemNo`, { itemNo: req.itemNo });
      }
      if(req.style !== undefined){
        query.andWhere(`co.style LIKE :style`, { style: `%${req.style}%` });
    }
      if (req.deliveryDateStartDate !== undefined) {
        query.andWhere(`STR_TO_DATE(co.delivery_date, '%d-%m-%Y') BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
    }
   
    

    if (req.coNumber !== undefined) {
      query.andWhere(`co.co_number LIKE :coNumber`, { coNumber: `%${req.coNumber}%` });
  }
  
      return await query.getRawMany();
    }






    async getCoPoNumber(): Promise<any[]> {
        const query = this.createQueryBuilder('co')
            .select(`co.id,co.buyer_po`)
            .groupBy(`co.buyer_po`)
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
   

    // async getDataforCOLineCreation(): Promise<any[]> {
    //     const query = this.createQueryBuilder('co')
    //         .select(`co.id, co.cust_po, co.item_no, co.buyer`)
    //         .where(` status != 'Success' AND status != 'Inprogress' AND is_active = true`)
    //         .orderBy(` created_at`, 'ASC')
    //     return await query.getRawMany();
    // }

    
}