import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomEntity } from "../entites/dpom.entity";

@Injectable()
export class DpomRepository extends Repository<DpomEntity> {
    getFactoryReportData() {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(DpomEntity) private dpomRepository: Repository<DpomEntity>
    ) {
        super(dpomRepository.target, dpomRepository.manager, dpomRepository.queryRunner);
    }
  
    async getDivertReport(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`id,plant,dpom_item_line_status AS lineStatus, plant_name AS plantName,document_date AS documentDate,po_number AS poNumber,
            po_line_item_number AS poLine ,destination_country AS destination,shipping_type AS shipmentType, 
            inventory_segment_code AS inventorySegmentCode, ogac AS ogac ,gac AS gac ,product_code AS productCode,
            item_vas_text`)
            .where(`dpom_item_line_status IN ('accepted','Unaccepted')`)
        return await query.getRawMany()
    }
}