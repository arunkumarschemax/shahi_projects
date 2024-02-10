import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HbPoOrderFilter, hbCoLineRequest } from "packages/libs/shared-models/src/common/hb-athletic";
import { SanmarOrderFilter } from "packages/libs/shared-models/src/common/sanmar/sanmar-order-filter";
import { EddieCOLineEntity } from "../entities/eddie-co-line.entity";
import { EddieOrderFilter } from "packages/libs/shared-models/src/common/eddiebauer/eddie-order-filter";


@Injectable()
export class EddieCOLineRepository extends Repository<EddieCOLineEntity> {

    constructor(@InjectRepository(EddieCOLineEntity) private eddieCoLineRepository: Repository<EddieCOLineEntity>
    ) {
        super(eddieCoLineRepository.target, eddieCoLineRepository.manager, eddieCoLineRepository.queryRunner);
    }

    async getCoLineData(req: EddieOrderFilter): Promise<any[]> {
      const query = this.createQueryBuilder('co')
        .select(`DISTINCT co.po_number,co.po_line,co.delivery_date, co.co_date, co.item_no, co.status, co.error_msg,
                 DATE_FORMAT(co.created_at, '%m/%d/%Y %H:%i') as raised_date, co.created_user, co.co_number,co.id,co.updated_at`);
  
      if (req.poNumber !== undefined) {
        query.andWhere(`co.po_number = :poNumber`, { poNumber: req.poNumber });
      }
      if (req.itemNo !== undefined) {
        query.andWhere(`co.item_no = :itemNo`, { itemNo: req.itemNo });
      }
    //   if(req.style !== undefined){
    //     query.andWhere(`co.style LIKE :style`, { style: `%${req.style}%` });
    // }
    if (req.deliveryDateStartDate !== undefined) {
      query.andWhere(`STR_TO_DATE(co.delivery_date, '%Y-%m-%d') BETWEEN '${req.deliveryDateStartDate}' AND '${req.deliveryDateEndDate}'`)
  }
   
    

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
            .select(`co.id, co.po_number,co.po_line,co.buyer`)
            .where(` status != 'Success' AND status != 'Inprogress' AND is_active = true`)
            .orderBy(` created_at`, 'ASC')
        return await query.getRawMany();
    }

    
}