import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomDifferenceEntity } from "../entites/dpom-difference.entity";
import { FileIdReq } from "../../orders/models/file-id.req";

@Injectable()
export class DpomDifferenceRepository extends Repository<DpomDifferenceEntity> {
    getFactoryReportData() {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(DpomDifferenceEntity) private dpomDifferenceRepository: Repository<DpomDifferenceEntity>
    ) {
        super(dpomDifferenceRepository.target, dpomDifferenceRepository.manager, dpomDifferenceRepository.queryRunner);
    }

    async deleteDiffData(req: FileIdReq): Promise<void> {
        const queryBuilder = this.createQueryBuilder('oc');
        queryBuilder.where(`file_id = '${req.fileId}'`);
        await queryBuilder.delete().execute();
    }
    async getDisplayName(poNumber:string, po_line_item_number : string): Promise<any[]> {
        const query = this.createQueryBuilder('dif')
         .select(` po_number, po_line_item_number, GROUP_CONCAT(DISTINCT display_name SEPARATOR ', ') AS displayName`)
         .where(`po_number = ${poNumber}`) 
         .andWhere(`po_line_item_number = ${po_line_item_number}`)
         .groupBy(`display_name,po_line_item_number`)

        return await query.getRawMany();
    }
    async getPpmPo(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_number,dpom.dpom_diff_id`)
            .groupBy(`dpom.po_number`)
            .where(` dpom.po_number IS NOT NULL`)
        return await query.getRawMany();
    }
    
}