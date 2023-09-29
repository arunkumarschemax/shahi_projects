import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomEntity } from "../entites/dpom.entity";
import { DpomDifferenceEntity } from "../entites/dpom-difference.entity";
import { FileIdReq } from "../../orders/models/file-id.req";
import { DpomChildEntity } from "../entites/dpom-child.entity";
import { PpmDateFilterRequest, nikeFilterRequest } from "@project-management-system/shared-models";
import { FobEntity } from "../../fob-price-list/fob.entity";

@Injectable()
export class DpomRepository extends Repository<DpomEntity> {

    constructor(@InjectRepository(DpomEntity) private dpomRepository: Repository<DpomEntity>
    ) {
        super(dpomRepository.target, dpomRepository.manager, dpomRepository.queryRunner);
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
            ship_to_address_dia AS shipToAddressDia,cab_code AS cabCode,hanger,customer_order AS co,commission,gender_age_desc`)
        return await query.getRawMany();
    }

    async getTotalItemQtyChangeData(req: nikeFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.po_number,dpom.created_at,dpom.item,dpom.factory,dpom.product_code AS productCode,dpom.ogac AS OGAC,dpom.style_number AS styleNumber,dpom.destination_country AS desCtry,dpom.color_desc,dpom.size_description,dpom.gac AS GAC,dpom.total_item_qty AS totalItemQty,dpom.item_text,dpom.po_and_line ,dpom.po_line_item_number, dpom.schedule_line_item_number, dpom.total_item_qty, dpom.dpom_item_line_status, od.created_at, od.old_val, od.new_val, (od.new_val - od.old_val) AS Diff , od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number AND od.schedule_line_item_number = dpom.schedule_line_item_number')
            .where(` od.column_name='total_item_qty' `)
        if (req && req.poandLine !== undefined) {
            query.andWhere(`dpom.po_and_line ='${req.poandLine}'`)
            return await query.getRawMany();
        } else
            return await query.getRawMany();
    }

    async poLineItemStatusChange(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.item,o.po_and_line, o.factory,o.document_date,o.style_number,o.product_code,o.color_desc,o.destination_country,o.ogac,o.gac,o.item_text,
            o.size_description,o.customer_order, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, od.created_at, od.old_val, od.new_val, od.odVersion`)
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
            .select(`o.po_number, o.item, o.factory,o.document_date,o.style_number,o.product_code,o.color_desc,o.destination_country,o.ogac,o.gac,o.item_text,
            o.size_description,o.customer_order, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
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
            .select(`o.po_number, o.po_line_item_number,  o.item, o.factory,o.document_date,o.style_number,o.product_code,o.color_desc,o.destination_country,o.ogac,o.gac,o.item_text,
            o.size_description,o.customer_order,o.schedule_line_item_number, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='gac' `)
        return await query.getRawMany();
    }

    async getMRGACChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number,o.po_and_line, o.schedule_line_item_number,  o.item, o.factory,o.document_date,o.style_number,o.product_code,o.color_desc,o.destination_country,o.ogac,o.gac,o.item_text,
            o.size_description,o.customer_order,o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='mrgac' `)
        return await query.getRawMany();
    }

    async getModeOfTransportChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.item, o.factory,o.document_date,o.style_number,o.product_code,o.color_desc,o.destination_country,o.ogac,o.gac,o.item_text,
            o.size_description,o.customer_order, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='unit' `)
        return await query.getRawMany();
    }

    async getPlantCodeChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.item, o.factory,o.document_date,o.style_number,o.product_code,o.color_desc,o.destination_country,o.ogac,o.gac,o.item_text,
            o.size_description,o.customer_order, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .where(` od.column_name='plant' `)
        return await query.getRawMany();
    }

    async getShippingTypeChangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.po_line_item_number, o.schedule_line_item_number, o.item, o.factory,o.document_date,o.style_number,o.product_code,o.color_desc,o.destination_country,o.ogac,o.gac,o.item_text,
            o.size_description,o.customer_order, o.total_item_qty, o.dpom_item_line_status, od.created_at, od.old_val, od.new_val, od.odVersion`)
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
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED' AND dpom.item <> ' '`)
            .groupBy(`dpom.item`)
        return await query.getRawMany();
    }

    async getFactoryForfactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.factory,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED'AND dpom.factory <> ' '`)
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
            .where(`dpom.doc_type_code != :docType AND dpom.item <> ' '`, { docType: 'ZP26' },)
            .groupBy(`dpom.item`)
        return await query.getRawMany();
    }

    async getFactoryforMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.factory,dpom.id`)
            .where(`dpom.doc_type_code != :docType AND dpom.factory <> ' '`, { docType: 'ZP26' })
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

    ///-------------------------------------------------------------------->factory
    async getFactoryPpmData(req: PpmDateFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.po_and_line,dpom.last_modified_date,dpom.item,dpom.factory,dpom.document_date,dpom.po_number,dpom.po_line_item_number,dpom.dpom_item_line_status,dpom.style_number,dpom.product_code,dpom.color_desc,dpom.customer_order,dpom.po_final_approval_date,dpom.plan_no,dpom.lead_time,dpom.category_code,dpom.category_desc,dpom.vendor_code,dpom.gcc_focus_code,dpom.gcc_focus_desc,dpom.gender_age_code,dpom.gender_age_desc,dpom.destination_country_code,dpom.destination_country,dpom.plant,dpom.plant_name,dpom.trading_co_po_no,dpom.upc,dpom.direct_ship_so_no,dpom.direct_ship_so_item_no,dpom.customer_po,dpom.ship_to_customer_no,dpom.ship_to_customer_name,dpom.planning_season_code,dpom.planning_season_year , dpom.pcd,dpom.doc_type_code, dpom.doc_type_desc,dpom.mrgac,dpom.ogac,dpom.gac,dpom.truck_out_date,dpom.origin_receipt_date,dpom.factory_delivery_date,dpom.gac_reason_code,dpom.gac_reason_desc,dpom.shipping_type,dpom.planning_priority_code,dpom.planning_priority_desc,dpom.launch_code,dpom.mode_of_transport_code,dpom.inco_terms,dpom.inventory_segment_code,dpom.purchase_group_code,dpom.purchase_group_name,dpom.total_item_qty,dpom.actual_shipped_qty,dpom.vas_size,dpom.item_vas_text,dpom.item_text,dpom.legal_po_price,dpom.co_price,dpom.pcd,dpom.ship_to_address_legal_po,dpom.ship_to_address_dia,dpom.cab_code,dpom.gross_price_fob,dpom.ne_inc_disc,dpom.trading_net_inc_disc,dpom.actual_unit,dpom.allocated_quantity,dpom.size_description,dpom.size_qty,dpom.trading_co_po_no, od.display_name AS displayName,dpom.hanger,dpom.legal_po_qty `)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number')
            .where(`dpom.doc_type_code != 'ZP26' AND dpom.dpom_item_line_status != 'Cancelled'`)
        if (req.lastModifedStartDate !== undefined) {
            query.andWhere(`Date(dpom.last_modified_date) BETWEEN '${req.lastModifedStartDate}' AND '${req.lastModifedEndtDate}'`)
        }
        if (req.documentStartDate !== undefined) {
            query.andWhere(`Date(dpom.document_date) BETWEEN '${req.documentStartDate}' AND '${req.documentEndtDate}'`)
        }
        if (req.DPOMLineItemStatus !== undefined && req.DPOMLineItemStatus.length > 0) {
            query.andWhere(`dpom.dpom_item_line_status IN (:...statuses)`, { statuses: req.DPOMLineItemStatus });
        } else if (req.DPOMLineItemStatus !== undefined && req.DPOMLineItemStatus.length === 0) {
            query.andWhere(`1=1`);
        }

        if (req.productCode !== undefined) {
            query.andWhere(`dpom.product_code ='${req.productCode}'`)
        }
        if (req.poNumber !== undefined) {
            query.andWhere(`dpom.po_number ='${req.poNumber}'`)
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
            .select(`dpom.po_and_line,dpom.last_modified_date,dpom.item,dpom.factory,dpom.document_date,dpom.po_number,dpom.po_line_item_number,dpom.dpom_item_line_status,dpom.style_number,dpom.product_code,dpom.color_desc,dpom.customer_order,dpom.po_final_approval_date,dpom.plan_no,dpom.lead_time,dpom.category_code,dpom.category_desc,dpom.vendor_code,dpom.gcc_focus_code,dpom.gcc_focus_desc,dpom.gender_age_code,dpom.gender_age_desc,dpom.destination_country_code,dpom.destination_country,dpom.plant,dpom.plant_name,dpom.trading_co_po_no,dpom.upc,dpom.direct_ship_so_no,dpom.direct_ship_so_item_no,dpom.customer_po,dpom.ship_to_customer_no,dpom.ship_to_customer_name,dpom.planning_season_code,dpom.planning_season_year , dpom.pcd,dpom.doc_type_code, dpom.doc_type_desc,dpom.mrgac,dpom.ogac,dpom.gac,dpom.truck_out_date,dpom.origin_receipt_date,dpom.factory_delivery_date,dpom.gac_reason_code,dpom.gac_reason_desc,dpom.shipping_type,dpom.planning_priority_code,dpom.planning_priority_desc,dpom.launch_code,dpom.mode_of_transport_code,dpom.inco_terms,dpom.inventory_segment_code,dpom.purchase_group_code,dpom.purchase_group_name,dpom.total_item_qty,dpom.actual_shipped_qty,dpom.vas_size,dpom.item_vas_text, dpom.item_vas_pdf, dpom.item_text, dpom.legal_po_price, dpom.legal_po_currency, dpom.co_price, dpom.co_price_currency, dpom.ship_to_address_legal_po,dpom.ship_to_address_dia,dpom.cab_code,dpom.gross_price_fob,dpom.ne_inc_disc,dpom.trading_net_inc_disc,dpom.actual_unit,dpom.allocated_quantity,dpom.size_description,dpom.size_qty,dpom.trading_co_po_no,dpom.net_inc_disc_currency_code, dpom.crm_co_qty, dpom.trading_net_currency_code, od.display_name AS displayName,dpom.fob_currency_code,dpom.hanger,dpom.legal_po_qty, dpom.geo_code, fob.shahi_confirmed_gross_price, fob.shahi_confirmed_gross_price_currency_code`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number')
            .leftJoin(FobEntity, 'fob', `fob.color_code = SUBSTRING_INDEX(dpom.product_code, '-', -1) AND fob.style_number = dpom.style_number AND fob.size_description = dpom.size_description`)
        // .groupBy(`dpom.po_number AND dpom.po_line_item_number AND dpom.size_description`)
        if (req.lastModifedStartDate !== undefined) {
            query.andWhere(`Date(dpom.last_modified_date) BETWEEN '${req.lastModifedStartDate}' AND '${req.lastModifedEndtDate}'`)
        }
        if (req.documentStartDate !== undefined) {
            query.andWhere(`Date(dpom.document_date) BETWEEN '${req.documentStartDate}' AND '${req.documentEndtDate}'`)
        } if (req.productCode !== undefined) {
            query.andWhere(`dpom.product_code ='${req.productCode}'`)
        }
        if (req.poNumber !== undefined) {
            query.andWhere(`dpom.po_number ='${req.poNumber}'`)
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
        if (req.docTypeCode !== undefined) {
            query.andWhere(`dpom.doc_type_code ='${req.docTypeCode}'`)
        }
        if (req.poLineItemNumber !== undefined) {
            query.andWhere(`dpom.po_line_item_number ='${req.poLineItemNumber}'`)
        }
        if (req.styleNumber !== undefined) {
            query.andWhere(`dpom.style_number ='${req.styleNumber}'`)
        }
        if (req.planningSeasonCode !== undefined) {
            query.andWhere(`dpom.planning_season_code ='${req.planningSeasonCode}'`)
        }
        if (req.planningSeasonYear !== undefined) {
            query.andWhere(`dpom.planning_season_year ='${req.planningSeasonYear}'`)
        }
        if (req.DPOMLineItemStatus !== undefined && req.DPOMLineItemStatus.length > 0) {
            query.andWhere(`dpom.dpom_item_line_status IN (:...statuses)`, { statuses: req.DPOMLineItemStatus });
        } else if (req.DPOMLineItemStatus !== undefined && req.DPOMLineItemStatus.length === 0) {
            query.andWhere(`1=1`);
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
        let query = this.createQueryBuilder('d')
            .select(` d.id,d.po_number, d.dpom_item_line_status, d.po_line_item_number, d.schedule_line_item_number, d.size_qty, d.size_description, d.document_date, d.plant_name, d.purchase_group_name, d.product_code, d.category_desc, d.shipping_type,
            d.gross_price_fob, d.fob_currency_code, d.mrgac, d.gac, d.total_item_qty,
            MAX(CASE WHEN df.display_name = 'MRGAC' THEN df.old_val END) AS MRGAC_OLD,
            MAX(CASE WHEN df.display_name = 'MRGAC' THEN df.new_val END) AS MRGAC_NEW,
            MAX(CASE WHEN df.display_name = 'totalItemQty' THEN df.new_val END) AS totalItemQty_NEW,
            MAX(CASE WHEN df.display_name = 'totalItemQty' THEN df.old_val END) AS totalItemQty_OLD,
            MAX(CASE WHEN df.display_name = 'FOBCurrencyCode' THEN df.new_val END) AS FOBCurrencyCode_NEW,
            MAX(CASE WHEN df.display_name = 'FOBCurrencyCode' THEN df.old_val END) AS FOBCurrencyCode_OLD,
            MAX(CASE WHEN df.display_name = 'grossPriceFOB' THEN df.old_val END) AS grossPriceFOB_OLD,
            MAX(CASE WHEN df.display_name = 'grossPriceFOB' THEN df.new_val END) AS grossPriceFOB_NEW,
            MAX(CASE WHEN df.display_name = 'GAC' THEN df.old_val END) AS GAC_OLD,
            MAX(CASE WHEN df.display_name = 'GAC' THEN df.new_val END) AS GAC_NEW,
            MAX(CASE WHEN df.display_name = 'trCoNetIncludingDisc' THEN df.old_val END) AS trCoNetIncludingDisc_OLD,
            MAX(CASE WHEN df.display_name = 'trCoNetIncludingDisc' THEN df.new_val END) AS trCoNetIncludingDisc_OLD`)
            .leftJoin(DpomDifferenceEntity, 'df', 'df.po_number = d.po_number AND df.po_line_item_number = d.po_line_item_number')
            .where(` d.dpom_item_line_status = 'Unaccepted'`)
        // .orderBy(`CASE WHEN dpom.dpom_item_line_status = 'Unaccepted' THEN 0 ELSE 1 END`, 'ASC')
        if (req.documentStartDate !== undefined) {
            query.andWhere(`Date(d.document_date) BETWEEN '${req.documentStartDate}' AND '${req.documentEndDate}'`)
        }
        if (req.productCode !== undefined) {
            query.andWhere(`d.product_code ='${req.productCode}'`)
        }
        if (req.poandLine !== undefined) {
            query.andWhere(`d.po_number ='${req.poandLine}'`)
        }
        if (req.DPOMLineItemStatus !== undefined) {
            query.andWhere(`d.dpom_item_line_status IN (:...statuses)`, { statuses: req.DPOMLineItemStatus });
        }
        query = query.orderBy(' d.po_number', 'ASC')
            .addOrderBy(' d.po_line_item_number', 'ASC')
            .addOrderBy(' d.schedule_line_item_number', 'ASC')
            .groupBy(` d.po_number, d.po_line_item_number, d.schedule_line_item_number`)
        return await query.getRawMany();
    }

    async getPpmProductCodeForOrderCreation(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.productCode,dpom.id`)
            .where(`dpom.dpom_item_line_status IN('Unaccepted')`)
            .groupBy(`dpom.productCode`)
        return await query.getRawMany();
    }

    async getPoLineforOrderCreation(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_number,dpom.id`)
            .where(`dpom.dpom_item_line_status = 'Unaccepted'`)
            .groupBy(`dpom.po_number`)
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

    async getOrdersDetails(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_number,dpom.po_line_item_number, dpom.schedule_line_item_number`)
        return await query.getRawMany();
    }
    async getPoforfactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_number,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED'`)
            .groupBy(`dpom.po_number`)
        return await query.getRawMany();
    }
    async getPoNumberforMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_number,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.po_number`)
        return await query.getRawMany();
    }
    async getPpmDocTypeForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.doc_type_code,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.doc_type_code`)
        return await query.getRawMany();
    }
    async getPpmPoLineItemNumberForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_line_item_number,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.po_line_item_number`)
        return await query.getRawMany();
    }

    async getPpmStyleNumberForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.style_number,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.style_number`)
        return await query.getRawMany();
    }

    async getPpmplanningSeasonYearForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.planning_season_year,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.planning_season_year`)
        return await query.getRawMany();
    }

    async getPpmplanningSeasonCodeForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.planning_season_code,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.planning_season_code`)
        return await query.getRawMany();
    }

    async getPpmdesCountryNameMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.destination_country,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.destination_country`)
        return await query.getRawMany();
    }

    async getPpmGeoCodeMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.geo_code, dpom.id`)
            .groupBy(`dpom.geo_code`)
        return await query.getRawMany();
    }
    async getChangeSData(poNumber:number): Promise<any[]> {
        
        const query = this.createQueryBuilder('o')
            .select(` o.id,o.size_description,o.size_qty,o.po_number,o.legal_po_qty AS legalPoQty,o.gross_price_fob,o.fob_currency_code,o.legal_po_price,o.legal_po_currency,o.po_number,o.po_and_line, (o.legal_po_qty- o.size_qty) AS qty_difference,(o.legal_po_price-o.gross_price_fob) AS price_change
            `)
            .where(`o.po_number = ${poNumber}`)      
          //  .andWhere(`o.dpom_item_line_status = 'Unaccepted'`)     
        return await query.getRawMany();
    }

}