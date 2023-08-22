import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomEntity } from "../entites/dpom.entity";
import { DpomDifferenceEntity } from "../entites/dpom-difference.entity";
import { FileIdReq } from "../../orders/models/file-id.req";
import { DpomChildEntity } from "../entites/dpom-child.entity";

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
        const query = this.createQueryBuilder('dpm')
            .select(`DISTINCT dpm.id,dpm.plant AS nPlant,dpm.dpom_item_line_status AS nLineStatus,
            dpm.plant_name AS nPlantName,dpm.document_date AS nDocumentDate,
            dpm.po_number AS npoNumber,dpm.po_line_item_number AS npoLine ,dpm.destination_country AS ndestination,
            dpm.shipping_type AS nshipmentType,dpm.inventory_segment_code AS ninventorySegmentCode,
            dpm.ogac AS nogac ,dpm.gac AS ngac ,dpm.product_code AS nproductCode,
            dpm.item_vas_text AS nitemVasText,dpm.quantity AS nQuantity,dpc.plant AS oplant,
            dpc.dpom_item_line_status AS onLineStatus,dpc.plant_name AS oPlantName ,
            dpc.document_date AS oDocumentDate,dpc.po_number AS opoNumber, dpc.po_line_item_number AS opoLine,
            dpc.destination_country AS odestination , dpc.shipping_type AS oshipmentType,dpc.inventory_segment_code AS oinventorySegmentCode,
            dpc.ogac AS oogac,dpc.gac AS ogac,dpc.product_code AS oproductCode ,dpc.item_vas_text AS oitemVasText , dpc.quantity AS oquantity,dpm.created_at AS dpomCreatedDates `)
            .leftJoin(DpomChildEntity,'dpc','dpc.parent_id = dpm.id')
            .groupBy(`dpm.id,dpc.id`)
            //.where(`dpm.dpom_item_line_status IN ('accepted','Unaccepted')`)
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
            .select(`po_and_line AS poLine, po_number AS purchaseOrderNumber,po_line_item_number AS poLineItemNumber, style_number AS styleNumber ,
            destination_country AS destinationCountryName,product_code AS productCode ,color_desc AS colorDescription,planning_season_code AS planningSeasonCode,
            planning_season_year AS planningSeasonYear,ogac,gac,total_item_qty AS totalItemQuantity,mode_of_transport_code AS modeofTransport,
            shipping_type AS shippingType,doc_type_desc AS docTypeDescription,purchase_group_name AS purchaseGroupName,item,factory,plan_no AS plan,
            ship_to_address_legal_po AS shipToAddressToLegalPo,
            gross_price_fob AS fob,payment_term AS paymentTerm,fabric_content AS desFabricContent,fabric_source AS fabricLocation,
            ship_to_address_dia AS shipToAddressDia,cab_code AS cabCode,hanger,customer_order AS co,commission`)
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