import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomChildEntity } from "../entites/dpom-child.entity";
import { FileIdReq } from "../../orders/models/file-id.req";

@Injectable()
export class DpomChildRepository extends Repository<DpomChildEntity> {
    getFactoryReportData() {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(DpomChildEntity) private dpomChildRepository: Repository<DpomChildEntity>
    ) {
        super(dpomChildRepository.target, dpomChildRepository.manager, dpomChildRepository.queryRunner);
    }

    async getVersion(poNumber: string, poLineItemNumber: number, scheduleLineItemNumber: string): Promise<any[]> {
        const query = this.createQueryBuilder('oc')
            .select(`id, po_number, po_line_item_number, schedule_line_item_number, od_version`)
            .where(` po_number = '${poNumber}' AND po_line_item_number = ${poLineItemNumber} AND schedule_line_item_number = '${scheduleLineItemNumber}'`)
            .orderBy(` od_version`, 'DESC')
        return await query.getRawMany();
    }

    async deleteChildData(req: FileIdReq): Promise<void> {
        const queryBuilder = this.createQueryBuilder('oc');
        queryBuilder.where(`file_id = '${req.fileId}'`);
        await queryBuilder.delete().execute();
    }

    async getUpdatedData(): Promise<any[]> {
        const query = this.createQueryBuilder('oc')
            .select(`oc.file_id as fileId`)
            .orderBy(` oc.created_at`, 'DESC')
            .limit(1)
        return await query.getRawMany();
    }
}