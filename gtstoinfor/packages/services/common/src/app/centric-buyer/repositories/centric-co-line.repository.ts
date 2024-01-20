import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CentricCOLineEntity } from "../entity/centric-co-line.entity";
import { centricCoLineRequest } from "packages/libs/shared-models/src/common/centric/centric-coLine.req";


@Injectable()
export class CentricCOLineRepository extends Repository<CentricCOLineEntity> {

    constructor(@InjectRepository(CentricCOLineEntity) private CentricCoLineRepository: Repository<CentricCOLineEntity>
    ) {
        super(CentricCoLineRepository.target, CentricCoLineRepository.manager, CentricCoLineRepository.queryRunner);
    }

    async getCentricCoLineData(req: centricCoLineRequest): Promise<any[]> {
        const query = this.createQueryBuilder('co')
            .select(`DISTINCT co.po_number, co.delivery_date, co.co_date, co.po_line, co.item_no, co.status, co.error_msg, co.style_no, co.full_material,
                   DATE_FORMAT(co.created_at, '%m/%d/%Y %H:%i') as raised_date, co.created_user,co.id`);

        if (req.poNumber !== undefined) {
            query.andWhere(`co.po_number = :poNumber`, { poNumber: req.poNumber });
        }
        if (req.itemNo !== undefined) {
            query.andWhere(`co.item_no = :itemNo`, { itemNo: req.itemNo });
        }
        if (req.poLine !== undefined) {
            query.andWhere(`co.po_line = :poLine`, { poLine: req.poLine });
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
    async getOrderNumber(): Promise<any[]> {
        const query = this.createQueryBuilder('co')
            .select(`co.id,co.po_line`)
            .groupBy(`co.po_line`)
        //  .where(`order_no <> NULL`)
        return await query.getRawMany();
    }

    async getDataforCOLineCreation(): Promise<any> {
        const query = this.createQueryBuilder('co')
            .select(`co.id, co.po_number, co.po_line, co.item_no, co.buyer`)
            .where(` status != 'Success' AND status != 'Inprogress' AND is_active = true`)
        // .orderBy(` created_at`, 'ASC')
        return await query.getRawOne();
    }
}