import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { coLineRequest } from "@project-management-system/shared-models";
import { COLineEntity } from "../entities/co-line.entity";

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
            .select(`co.id,co.buyer_po,co.line_item_no,co.co_date, co.co_number, co.item_no, co.status, co.error_msg, co.created_at,co.version_flag,co.is_active,co.created_user,co.updated_user,co.updated_at`)
        if (req.buyerPo !== undefined) {
            query.andWhere(`co.buyer_po ='${req.buyerPo}'`)
        }
        if (req.itemNo !== undefined) {
            query.andWhere(`co.item_no ='${req.itemNo}'`)
        }
        if (req.orderNo !== undefined) {
            query.andWhere(`co.co_number ='${req.orderNo}'`)
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
            .select(`co.id,co.co_number`)
            .groupBy(`co.co_number`)
        //  .where(`order_no <> NULL`)
        return await query.getRawMany();
    }

    async getDataforCOLineCreation(): Promise<any[]> {
        const query = this.createQueryBuilder('co')
            .select(`co.id, co.buyer_po, co.line_item_no, co.item_no, co.buyer`)
            .where(` status != 'Success' AND is_active = true`)
            .orderBy(` created_at`, 'ASC')
        return await query.getRawMany();
    }
}