import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { COLineEntity } from "../entites/co-line.entity";
import { coLineRequest } from "@project-management-system/shared-models";

@Injectable()
export class COLineRepository extends Repository<COLineEntity> {
    getFactoryReportData() {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(COLineEntity) private coLineRepository: Repository<COLineEntity>
    ) {
        super(coLineRepository.target, coLineRepository.manager, coLineRepository.queryRunner);
    }

    async getCoLineData(req: coLineRequest): Promise<any[]> {
        const query = this.createQueryBuilder('co')
            .select(`co.id,co.buyer_po,co.division,co.PCH,co.facility,co.order_no,co.customer_code,co.item_no,co.item_desc,co.order_qty,co.UOM,co.size,co.price,co.currency,co.co_final_app_date,co.PCD,co.commision,co.plan_no,co.plan_unit,co.pay_terms,co.pay_terms_desc,co.created_at,co.version_flag,co.is_active`)
        if (req.buyerPo !== undefined) {
            query.andWhere(`co.buyer_po ='${req.buyerPo}'`)
        }
        if (req.itemNo !== undefined) {
            query.andWhere(`co.item_no ='${req.itemNo}'`)
        }
        if (req.orderNo !== undefined) {
            query.andWhere(`co.order_no ='${req.orderNo}'`)
        }
        return await query.getRawMany();
    }

    async getBuyerPo(): Promise<any[]> {
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
    async getOrderNumber(): Promise<any[]> {
        const query = this.createQueryBuilder('co')
            .select(`co.id,co.order_no`)
            .groupBy(`co.order_no`)
        //  .where(`order_no <> NULL`)
        return await query.getRawMany();
    }
}