import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomEntity } from "../entites/dpom.entity";
import { DpomDifferenceEntity } from "../entites/dpom-difference.entity";

@Injectable()
export class DpomRepository extends Repository<DpomEntity> {
    getFactoryReportData() {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(DpomEntity) private dpomRepository: Repository<DpomEntity>
    ) {
        super(dpomRepository.target, dpomRepository.manager, dpomRepository.queryRunner);
    }

    async getPlantCount(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`plant , plant_name , COUNT(po_number) AS poCount , SUM(total_item_qty) AS qty`)
            .groupBy(`plant`)
        return await query.getRawMany();
    }
    async getStatusWiseItemCount(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom_item_line_status , COUNT(dpom_item_line_status) AS count`)
            .groupBy(`dpom_item_line_status`)
        return await query.getRawMany();
    }

    async getQtyChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, (od.new_val - od.old_val) AS Diff , od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` column_name='total_item_qty' `)
        return await query.getRawMany();
    }

    async poLineItemStatusChange(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` column_name='dpom_line_item_status' `)
        return await query.getRawMany();
    }
}