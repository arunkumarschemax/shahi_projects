import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomEntity } from "../entites/dpom.entity";
import { DpomDifferenceEntity } from "../entites/dpom-difference.entity";
import { FileIdReq } from "../../orders/models/file-id.req";

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

    async getCategoriesWiseItemQty(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`category_desc ,  SUM(total_item_qty) AS totalItemQty`)
            .where(`category_desc  IS NOT NULL`)
            .andWhere(`dpom_item_line_status = 'Accepted'||'Unaccepted'`)
            .groupBy(`category_desc`)
        return await query.getRawMany();
    }

    async getShipmentWiseItems(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`shipping_type , SUM( IF(dpom_item_line_status ='Accepted', 1 , 0)) AS Accepted,SUM( IF(dpom_item_line_status ='Unaccepted', 1 , 0)) AS unAccepted`)
            .groupBy(`shipping_type`)
        return await query.getRawMany();
    }

    async getPlanningShipment(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`planning_season_year AS planningSeasonYear, COUNT(po_number) AS poCount`)
            .where(`planning_season_year  IS NOT NULL`)
            .andWhere(`dpom_item_line_status = 'Accepted'||'Unaccepted'`)
            .groupBy(`planning_season_year`)
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

    async getTotalItemQtyChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.po_number, dpom.po_line_item_number, dpom.schedule_line_item_number, dpom.total_item_qty, dpom.dpom_item_line_status, od.created_at, od.old_val, od.new_val, (od.new_val - od.old_val) AS Diff , od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number AND od.schedule_line_item_number = dpom.schedule_line_item_number')
            .where(` od.column_name='total_item_qty' `)
        return await query.getRawMany();
    }

    async poLineItemStatusChange(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='dpom_line_item_status' `)
        return await query.getRawMany();
    }

    async deleteData(req: FileIdReq): Promise<void> {
        const queryBuilder = this.createQueryBuilder('dpom');
        queryBuilder.where(`file_id = '${req.fileId}' AND version = 1`);
        await queryBuilder.delete().execute();
    }
}