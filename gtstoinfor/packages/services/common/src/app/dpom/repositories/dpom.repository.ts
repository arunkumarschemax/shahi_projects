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

    async getCountForDivertReport(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`COUNT(dpom_item_line_status ) AS totalCount,SUM(dpom_item_line_status = 'accepted') AS acceptedCount, SUM(dpom_item_line_status = 'Unaccepted') AS unacceptedCount `)
            .where(`dpom_item_line_status IN ('accepted','Unaccepted')`)
        return await query.getRawMany()
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
    async shipmentChart(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`po_number AS poLine, po_number AS purchaseOrderNumber,po_line_item_number AS poLineItemNumber, style_number AS styleNumber ,
            destination_country AS destinationCountryName,product_code AS productCode ,color_desc AS colorDescription,planning_season_code AS planningSeasonCode,
            planning_season_year AS planningSeasonYear,ogac,gac,total_item_qty AS totalItemQuantity,mode_of_transport_code AS modeofTransport,shipping_type AS shippingType,
            doc_type_desc AS docTypeDescription,purchase_group_name AS purchaseGroupName `)
        return await query.getRawMany();
    }
}