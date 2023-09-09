import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomEntity } from "../entites/dpom.entity";
import { DpomDifferenceEntity } from "../entites/dpom-difference.entity";
import { FileIdReq } from "../../orders/models/file-id.req";
import { DpomChildEntity } from "../entites/dpom-child.entity";
import { PpmDateFilterRequest } from "@project-management-system/shared-models";

@Injectable()
export class DpomRepository extends Repository<DpomEntity> {
    getFactoryReportData() {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(DpomEntity) private dpomRepository: Repository<DpomEntity>
    ) {
        super(dpomRepository.target, dpomRepository.manager, dpomRepository.queryRunner);
    }

    // async getDivertReport(): Promise<any[]> {
    //     const query = this.createQueryBuilder('dpm')
    //         .select(`DISTINCT dpm.id,dpm.plant AS nPlant,dpm.dpom_item_line_status AS nLineStatus,
    //         dpm.plant_name AS nPlantName,dpm.document_date AS nDocumentDate,
    //         dpm.po_number AS npoNumber,dpm.po_line_item_number AS npoLine ,dpm.destination_country AS ndestination,
    //         dpm.shipping_type AS nshipmentType,dpm.inventory_segment_code AS ninventorySegmentCode,
    //         dpm.ogac AS nogac ,dpm.gac AS ngac ,dpm.product_code AS nproductCode,
    //         dpm.item_vas_text AS nitemVasText,dpm.quantity AS nQuantity,dpc.plant AS oplant,
    //         dpc.dpom_item_line_status AS onLineStatus,dpc.plant_name AS oPlantName ,
    //         dpc.document_date AS oDocumentDate,dpc.po_number AS opoNumber, dpc.po_line_item_number AS opoLine,
    //         dpc.destination_country AS odestination , dpc.shipping_type AS oshipmentType,dpc.inventory_segment_code AS oinventorySegmentCode,
    //         dpc.ogac AS oogac,dpc.gac AS ogac,dpc.product_code AS oproductCode ,dpc.item_vas_text AS oitemVasText , dpc.quantity AS oquantity,dpm.created_at AS dpomCreatedDates `)
    //         .leftJoin(DpomChildEntity,'dpc','dpc.parent_id = dpm.id')
    //         .groupBy(`dpm.id,dpc.id`)
    //         //.where(`dpm.dpom_item_line_status IN ('accepted','Unaccepted')`)
    //     return await query.getRawMany()
    // }

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

    async getTotalItemQtyChangeData(req: nikeFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.po_number, dpom.po_line_item_number, dpom.schedule_line_item_number, dpom.total_item_qty, dpom.dpom_item_line_status, od.created_at, od.old_val, od.new_val, (od.new_val - od.old_val) AS Diff , od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number AND od.schedule_line_item_number = dpom.schedule_line_item_number')
            .where(` od.column_name='total_item_qty' `)
        if (req.poandLine !== undefined) {
            query.andWhere(`dpom.po_and_line ='${req.poandLine}'`)
        }
        return await query.getRawMany();
    }

    async poLineItemStatusChange(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='dpom_line_item_status' `)
        return await query.getRawMany();
    }

    async deleteData(req: FileIdReq): Promise<void> {
        const queryBuilder = this.createQueryBuilder('dpom');
        queryBuilder.where(`file_id = '${req.fileId}' AND version = 1`);
        await queryBuilder.delete().execute();
    }

    async getItemChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='item' `)
        return await query.getRawMany();
    }

    async getUnitChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='unit' `)
        return await query.getRawMany();
    }

    async getFOBPriceChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name = 'gross_price_fob'`)
        // if (req.poandLine !== undefined) {
        //     query.andWhere(`o.po_and_line ='${req.poandLine}'`)
        // }
        return await query.getRawMany();
    }

    async getNetInclDiscChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='ne_inc_disc' `)
        return await query.getRawMany();
    }

    async getTradingNetInclDiscChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='trading_net_inc_disc' `)
        return await query.getRawMany();
    }

    async getGACChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='gac' `)
        return await query.getRawMany();
    }

    async getMRGACChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='mrgac' `)
        return await query.getRawMany();
    }

    async getModeOfTransportChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='unit' `)
        return await query.getRawMany();
    }

    async getPlantCodeChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='plant' `)
        return await query.getRawMany();
    }

    async getShippingTypeChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='shipping_type' `)
        return await query.getRawMany();
    }

    async getVasTextChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='vas_text' `)
        return await query.getRawMany();
    }

    async getShipToCustomerChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='ship_to_customer_name' `)
        return await query.getRawMany();
    }

    async getInventorySegmentCodeChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='inventory_segment_code' `)
        return await query.getRawMany();
    }

    async getDirectShipSoNoChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='direct_ship_so_no' `)
        return await query.getRawMany();
    }

    async getDestinationCountryChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='destination_country' `)
        return await query.getRawMany();
    }

    async getDestinationPo(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`destination_country AS destination, COUNT(po_number) AS poCount`)
            .where(`destination_country  IS NOT NULL`)
            .andWhere(`dpom_item_line_status = 'Accepted'||'Unaccepted'`)
            .groupBy(`destination_country`)
        return await query.getRawMany();
    }

    async getSeasonPo(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`planning_season_code AS season, COUNT(po_number) AS poCount`)
            .where(`planning_season_code  IS NOT NULL`)
            .andWhere(`dpom_item_line_status = 'Accepted'||'Unaccepted'`)
            .groupBy(`planning_season_code`)
        return await query.getRawMany();
    }

    async getPoAndQuantity(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`po_number AS poNumber, total_item_qty AS totalItemQuantity,created_at AS createdAt`)
        return await query.getRawMany();
    }

    async getDivertReport(): Promise<any[]> {
        const query = this.createQueryBuilder('dpm')
            .select(`DISTINCT id,item,plant AS Plant,dpom_item_line_status AS LineStatus,
            plant_name AS PlantName,document_date AS DocumentDate,
            po_number AS poNumber,po_line_item_number AS poLine ,destination_country AS destination,
            shipping_type AS shipmentType,inventory_segment_code AS inventorySegmentCode,
            ogac AS ogac ,gac AS gac ,product_code AS productCode,
            item_vas_text AS itemVasText,quantity AS Quantity,created_at AS dpomCreatedDates,diverted_to_pos`)
            .where(`diverted_to_pos IS NOT null`)
        return await query.getRawMany()
    }

    async getDivertWithNewDataReport(req: [po: string, line: string]): Promise<any[]> {
        const [po, line] = req;
        const query = this.createQueryBuilder('dpm')
            .select(` id AS nId,item, plant AS nPlant, dpom_item_line_status AS nLineStatus,
            plant_name AS nPlantName, document_date AS nDocumentDate,
            po_number AS npoNumber, po_line_item_number AS npoLine, destination_country AS ndestination,
            shipping_type AS nshipmentType, inventory_segment_code AS ninventorySegmentCode,
            ogac AS nogac, gac AS ngac, product_code AS nproductCode, dpom_item_line_status AS nDPOMLineItemStatus,
            item_vas_text AS nitemVasText, quantity AS nQuantity, created_at AS ndpomCreatedDates, diverted_to_pos`)
            .where(`diverted_to_pos IS NOT null`)
            .andWhere(`po_number = :po AND po_line_item_number = :line`, { po, line });

        return await query.getRawMany();
    }

    ///-----------------------------------------------------------------------------------------------factory
    async getPoLineforfactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_and_line,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED'`)
            .groupBy(`dpom.po_and_line`)
        return await query.getRawMany();
    }

    async getItemforfactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.item,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED'`)
            .groupBy(`dpom.item`)
        return await query.getRawMany();
    }

    async getFactoryForfactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.factory,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED'`)
            .groupBy(`dpom.factory`)
        return await query.getRawMany();
    }

    async getPlantForfactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.plant,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED'`)
            .groupBy(`dpom.plant`)
        return await query.getRawMany();
    }

    async getProductCodeForfactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.productCode,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED'`)
            .groupBy(`dpom.productCode`)
        return await query.getRawMany();
    }

    async getColorDescForfactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.colorDesc,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED'`)
            .groupBy(`dpom.colorDesc`)
        return await query.getRawMany();
    }

    async getCategoryDescForfactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.categoryDesc,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED'`)
            .groupBy(`dpom.categoryDesc`)
        return await query.getRawMany();
    }

    async getDestinationCountryForfactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.destinationCountry,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED'`)
            .groupBy(`dpom.destinationCountry`)
        return await query.getRawMany();
    }

    ///---------------------------marketing-----------------------------------------------
    async getPoLineforMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_and_line,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.po_and_line`)
        return await query.getRawMany();
    }

    async getItemforMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.item,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.item`)
        return await query.getRawMany();
    }

    async getFactoryforMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.factory,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.factory`)
        return await query.getRawMany();
    }

    async getPpmPlantForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.plant,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.plant`)
        return await query.getRawMany();
    }

    async getPpmProductCodeForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.productCode,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.productCode`)
        return await query.getRawMany();
    }

    async getPpmColorDescForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.colorDesc,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.colorDesc`)
        return await query.getRawMany();
    }

    async getPpmCategoryDescForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.categoryDesc,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.categoryDesc`)
        return await query.getRawMany();
    }

    async getPpmDestinationCountryForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.destinationCountry,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.destinationCountry`)
        return await query.getRawMany();
    }

    ///--------------------------------------------------------------------------------------------------------------------------->factory
    async getFactoryPpmData(req: PpmDateFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.*, od.display_name AS displayName `)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number')
        // .groupBy(`od.po_number AND od.po_line_item_number`)
        if (req.lastModifedStartDate !== undefined) {
            query.andWhere(`Date(dpom.last_modified_date) BETWEEN '${req.lastModifedStartDate}' AND '${req.lastModifedEndtDate}'`)
        }
        if (req.documentStartDate !== undefined) {
            query.andWhere(`Date(dpom.document_date) BETWEEN '${req.documentStartDate}' AND '${req.documentEndtDate}'`)
        }
        if (req.DPOMLineItemStatus !== undefined) {
            query.andWhere(`dpom.dpom_item_line_status IN (:...statuses)`, { statuses: req.DPOMLineItemStatus });
        }
        if (req.productCode !== undefined) {
            query.andWhere(`dpom.product_code ='${req.productCode}'`)
        }
        if (req.poandLine !== undefined) {
            query.andWhere(`dpom.po_and_line ='${req.poandLine}'`)
        }
        if (req.colorDesc !== undefined) {
            query.andWhere(`dpom.color_desc ='${req.colorDesc}'`)
        }
        if (req.categoryDesc !== undefined) {
            query.andWhere(`dpom.category_desc ='${req.categoryDesc}'`)
        }
        if (req.destinationCountry !== undefined) {
            query.andWhere(`dpom.destination_country ='${req.destinationCountry}'`)
        }
        if (req.plant !== undefined) {
            query.andWhere(`dpom.plant ='${req.plant}'`)
        }
        if (req.item !== undefined) {
            query.andWhere(`dpom.item ='${req.item}'`)
        }
        if (req.factory !== undefined) {
            query.andWhere(`dpom.factory ='${req.factory}'`)
        }

        return await query.getRawMany();
    }
    ///-------------------------------------------------------------------------------------------------------------->ppm marketing

    async getMarketingPpmData(req: PpmDateFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.*, od.display_name AS displayName `)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number')
        // .groupBy(`od.po_number AND od.po_line_item_number`)
        if (req.lastModifedStartDate !== undefined) {
            query.andWhere(`Date(dpom.last_modified_date) BETWEEN '${req.lastModifedStartDate}' AND '${req.lastModifedEndtDate}'`)
        }
        if (req.documentStartDate !== undefined) {
            query.andWhere(`Date(dpom.document_date) BETWEEN '${req.documentStartDate}' AND '${req.documentEndtDate}'`)
        } if (req.productCode !== undefined) {
            query.andWhere(`dpom.product_code ='${req.productCode}'`)
        }
        if (req.poandLine !== undefined) {
            query.andWhere(`dpom.po_and_line ='${req.poandLine}'`)
        }
        if (req.colorDesc !== undefined) {
            query.andWhere(`dpom.color_desc ='${req.colorDesc}'`)
        }
        if (req.categoryDesc !== undefined) {
            query.andWhere(`dpom.category_desc ='${req.categoryDesc}'`)
        }
        if (req.destinationCountry !== undefined) {
            query.andWhere(`dpom.destination_country ='${req.destinationCountry}'`)
        }
        if (req.plant !== undefined) {
            query.andWhere(`dpom.plant ='${req.plant}'`)
        }
        if (req.item !== undefined) {
            query.andWhere(`dpom.item ='${req.item}'`)
        }
        if (req.factory !== undefined) {
            query.andWhere(`dpom.factory ='${req.factory}'`)
        }
        if (req.DPOMLineItemStatus !== undefined) {
            query.andWhere(`dpom.dpom_item_line_status IN (:...statuses)`, { statuses: req.DPOMLineItemStatus });
        }
        return await query.getRawMany();
    }

    async getFactoryDataById(poline: string): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.id as docId,dpom.po_and_line as poline`)
            .where(`dpom.po_and_line = :poline`, { poline });

        return await query.getRawMany();
    }

    async getOrderAcceptanceDat(req: nikeFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.*`)
            .where(`dpom_item_line_status IN('Accepted','Unaccepted')`)
            .groupBy(`dpom.po_and_line`)
        if (req.documentStartDate !== undefined) {
            query.andWhere(`Date(dpom.document_date) BETWEEN '${req.documentStartDate}' AND '${req.documentEndDate}'`)
        }
        if (req.productCode !== undefined) {
            query.andWhere(`dpom.product_code ='${req.productCode}'`)
        }
        if (req.poandLine !== undefined) {
            query.andWhere(`dpom.po_and_line ='${req.poandLine}'`)
        }
        if (req.DPOMLineItemStatus !== undefined) {
            query.andWhere(`dpom.dpom_item_line_status IN (:...statuses)`, { statuses: req.DPOMLineItemStatus });
        }
        return await query.getRawMany();
    }

    async getPpmProductCodeForOrderCreation(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.productCode,dpom.id`)
            .where(`dpom.dpom_item_line_status IN('Accepted','Unaccepted')`)
            .groupBy(`dpom.productCode`)
        return await query.getRawMany();
    }

    async getPoLineforOrderCreation(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_and_line,dpom.id`)
            .where(`dpom.dpom_item_line_status IN('Accepted','Unaccepted')`)
            .groupBy(`dpom.po_and_line`)
        return await query.getRawMany();
    }

    async getPpmPoLineForNikeOrder(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_and_line,dpom.id`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number AND od.schedule_line_item_number = dpom.schedule_line_item_number')
            .groupBy(`dpom.po_and_line`)
            .where(` od.column_name='total_item_qty' `)
        return await query.getRawMany();
    }
}