import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HbCOLineEntity } from "../entity/hb-co-line.entity";
import { HbPoOrderFilter, hbCoLineRequest } from "packages/libs/shared-models/src/common/hb-athletic";


@Injectable()
export class HbCOLineRepository extends Repository<HbCOLineEntity> {

    constructor(@InjectRepository(HbCOLineEntity) private HbCoLineRepository: Repository<HbCOLineEntity>
    ) {
        super(HbCoLineRepository.target, HbCoLineRepository.manager, HbCoLineRepository.queryRunner);
    }

    async getHbCoLineData(req: HbPoOrderFilter): Promise<any[]> {
      const query = this.createQueryBuilder('co')
        .select(`DISTINCT co.cust_po, co.exit_factory_date, co.co_date, co.style, co.item_no, co.status, co.error_msg,
                 DATE_FORMAT(co.created_at, '%m/%d/%Y %H:%i') as raised_date, co.created_user, co.co_number,co.id,co.updated_at`);
  
      if (req.custPo !== undefined) {
        query.andWhere(`co.cust_po = :custPo`, { custPo: req.custPo });
      }
      if (req.itemNo !== undefined) {
        query.andWhere(`co.item_no = :itemNo`, { itemNo: req.itemNo });
      }
      if(req.style !== undefined){
        query.andWhere(`co.style LIKE :style`, { style: `%${req.style}%` });
    }
      if (req.deliveryDateStartDate !== undefined) {
        query.andWhere(`STR_TO_DATE(co.exit_factory_date, '%d-%m-%Y') BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
    }
   
    

    if (req.coNumber !== undefined) {
      query.andWhere(`co.co_number LIKE :coNumber`, { coNumber: `%${req.coNumber}%` });
  }
  
      return await query.getRawMany();
    }






    async getCoPoNumber(): Promise<any[]> {
        const query = this.createQueryBuilder('co')
            .select(`co.id,co.cust_po`)
            .groupBy(`co.cust_po`)
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
    // async getStyleNumber(): Promise<any[]> {
    //     const query = this.createQueryBuilder('co')
    //         .select(`co.id,co.style`)
    //         .groupBy(`co.style`)
    //     //  .where(`order_no <> NULL`)
    //     return await query.getRawMany();
    // }

    async getDataforCOLineCreation(): Promise<any[]> {
        const query = this.createQueryBuilder('co')
            .select(`co.id, co.cust_po, co.item_no, co.buyer`)
            .where(` status != 'Success' AND status != 'Inprogress' AND is_active = true`)
            .orderBy(` created_at`, 'ASC')
        return await query.getRawMany();
    }

    
}