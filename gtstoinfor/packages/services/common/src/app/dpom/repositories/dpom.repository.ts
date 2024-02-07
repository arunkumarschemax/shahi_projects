import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DpomEntity } from "../entites/dpom.entity";
import { DpomDifferenceEntity } from "../entites/dpom-difference.entity";
import { FileIdReq } from "../../orders/models/file-id.req";
import { DpomChildEntity } from "../entites/dpom-child.entity";
import { BomPrintFilterReq, FobPriceDiffRequest, ItemInfoFilterReq, PpmDateFilterRequest, nikeFilterRequest } from "@project-management-system/shared-models";
import { FobEntity } from "../../fob-price-list/fob.entity";
import { FabricContent } from "../../fabric-content/fabric-content.entity";
import { StyleEntity } from "../../po-bom/entittes/style-entity";
import { BomEntity } from "../../po-bom/entittes/bom-entity";
import { StyleComboEntity } from "../../po-bom/entittes/style-combo-entity";

@Injectable()
export class DpomRepository extends Repository<DpomEntity> {

    constructor(@InjectRepository(DpomEntity) private dpomRepository: Repository<DpomEntity>
    ) {
        super(dpomRepository.target, dpomRepository.manager, dpomRepository.queryRunner);
    }

    async getBuyerPOs(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`po_number, po_line_item_number, schedule_line_item_number, po_and_line, style_number, size_qty, size_description, item, factory `)
            .where(` doc_type_code != 'ZP26' AND dpom_item_line_status != 'Cancelled' AND ocr_status IS NULL `)
            .groupBy(` po_and_line `)
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
            ship_to_address_dia AS shipToAddressDia,cab_code AS cabCode,hanger,customer_order AS co,commission,gender_age_desc`)
        return await query.getRawMany();
    }

    async getTotalItemQtyChangeData(req: any): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.po_number,dpom.created_at,dpom.item,dpom.factory,dpom.product_code AS productCode,dpom.ogac AS OGAC,dpom.style_number AS styleNumber,dpom.destination_country AS desCtry,dpom.color_desc,dpom.size_description,dpom.gac AS GAC,dpom.total_item_qty AS totalItemQty,dpom.item_text,dpom.po_and_line ,dpom.po_line_item_number, dpom.schedule_line_item_number, dpom.total_item_qty, dpom.dpom_item_line_status, od.created_at, od.old_val, od.new_val, (od.new_val - od.old_val) AS Diff , od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number AND od.schedule_line_item_number = dpom.schedule_line_item_number')
            .where(` od.column_name='size_qty' `)
        if (req && req.poandLine !== undefined) {
            query.andWhere(`dpom.po_and_line ='${req.poandLine}'`)
            return await query.getRawMany();
        } else
            return await query.getRawMany();
    }

    async poLineItemStatusChange(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.po_number, o.item,o.po_and_line, o.factory,o.document_date,o.style_number,o.product_code,o.color_desc,o.destination_country,o.ogac,o.gac,o.item_text,
            o.size_description,o.customer_order, o.po_line_item_number, o.schedule_line_item_number, o.total_item_qty, od.created_at, od.old_val, od.new_val, od.odVersion, fm.shahi_confirmed_gross_price AS shahiOfferedPrice, 
            o.co_price AS crmCoPrice,o.co_price_currency AS coPriceCurrency,
            fm.shahi_confirmed_gross_price_currency_code AS shahiOfferedPricecurrency,o.legal_po_price,o.legal_po_currency `)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND od.schedule_line_item_number = o.schedule_line_item_number')
            .leftJoin(FobEntity, 'fm', `fm.style_number = o.style_number AND fm.color_code = SUBSTRING_INDEX(o.product_code, '-', -1) AND fm.size_description = o.size_description`)

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
            o.size_description,o.customer_order, o.po_line_item_number,o.ne_inc_disc, o.schedule_line_item_number, o.total_item_qty,
             o.dpom_item_line_status, od.created_at, od.od_version, fm.shahi_confirmed_gross_price AS shahiOfferedPrice, 
             o.co_price AS crmCoPrice,o.co_price_currency AS coPriceCurrency,
             fm.shahi_confirmed_gross_price_currency_code AS shahiOfferedPricecurrency ,
       (CASE WHEN od.display_name = 'grossPriceFOB' THEN od.old_val ELSE NULL END) AS grossPriceFobOld,
       (CASE WHEN od.display_name = 'grossPriceFOB' THEN od.new_val ELSE NULL END) AS grossPriceFobNew,
       (CASE WHEN od.display_name = 'trCoNetIncludingDisc' THEN od.old_val ELSE NULL END) AS trCoNetIncludingDiscOld,
       (CASE WHEN od.display_name = 'shahiOfferedPricefromMasterFile' THEN od.old_val ELSE NULL END) AS shahiOfferedPricefromMasterFileFrom,
       (CASE WHEN od.display_name = 'shahiOfferedPricefromMasterFile' THEN od.new_val ELSE NULL END) AS shahiOfferedPricefromMasterFileTo,
       (CASE WHEN od.display_name = 'shahicurrencyCodeMasterFile' THEN od.old_val ELSE NULL END) AS shahicurrencyCodeMasterFileFrom,
       (CASE WHEN od.display_name = 'shahicurrencyCodeMasterFile' THEN od.new_val ELSE NULL END) AS shahicurrencyCodeMasterFileTo,
       (CASE WHEN od.display_name = 'trCoNetIncludingDisc' THEN od.new_val ELSE NULL END) AS trCoNetIncludingDiscFrom,
     (CASE WHEN od.display_name = 'trCoNetIncludingDisc' THEN od.new_val ELSE NULL END) AS trCoNetIncludingDiscNew,
     (CASE WHEN od.display_name = 'trCoNetIncludingDiscCurrencyCode ' THEN od.old_val ELSE NULL END) AS trCoNetIncludingDiscCurrencyCodeFrom,
       (CASE WHEN od.display_name = 'trCoNetIncludingDiscCurrencyCode ' THEN od.new_val ELSE NULL END) AS trCoNetIncludingDiscCurrencyCodeTo,
            (CASE WHEN od.display_name = 'legalPoPrice ' THEN od.old_val ELSE NULL END) AS legalPoPrice,
            (CASE WHEN od.display_name = 'legalPoCurrency ' THEN od.new_val ELSE NULL END) AS legalPoCurrency `)
            .leftJoin(DpomDifferenceEntity, 'od', `od.po_number = o.po_number AND od.po_line_item_number = o.po_line_item_number AND
            od.schedule_line_item_number = o.schedule_line_item_number `)
            .leftJoin(FobEntity, 'fm', `fm.style_number = o.style_number AND fm.color_code = SUBSTRING_INDEX(o.product_code, '-', -1) AND fm.size_description = o.size_description`)
            .where(` od.display_name IN ('grossPriceFOB','trCoNetIncludingDisc','trCoNetIncludingDiscCurrencyCode',
            'shahiOfferedPricefromMasterFile','shahicurrencyCodeMasterFile','legalPoPrice','legalPoCurrency')`)
            .orderBy(' od.created_at', 'DESC')
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
            .groupBy(` o.po_and_line`)
            .orderBy(' od.created_at', 'DESC')
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

    async getVasTextChangeData(req: any): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.po_number AS purchaseOrderNumber,dpom.created_at,dpom.item,dpom.factory,dpom.product_code AS productCode,dpom.ogac AS OGAC,dpom.style_number AS styleNumber,dpom.destination_country AS destinationCountry,dpom.color_desc,dpom.size_description,dpom.gac AS GAC,dpom.total_item_qty AS totalItemQty,dpom.item_vas_text AS itemVasText,dpom.po_and_line ,dpom.po_line_item_number AS poLineItemNumber, dpom.schedule_line_item_number, dpom.total_item_qty, dpom.color_desc AS colorDesc, dpom.dpom_item_line_status, od.created_at, od.old_val, od.new_val, (od.new_val - od.old_val) AS Diff , od.odVersion`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number AND od.schedule_line_item_number = dpom.schedule_line_item_number')
            .where(` od.column_name='item_vas_text' AND (od.po_number, od.od_version) IN (
                SELECT po_number, MAX(od_version) AS max_version FROM dpom_diff GROUP BY po_number )`)
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
            .select(`dpm.po_and_line, dpm.id, LEFT(dpm.item, 4) AS item, dpm.plant AS Plant, dpm.dpom_item_line_status AS LineStatus,
            dpm.plant_name AS PlantName, dpm.document_date AS DocumentDate, dpm.po_number AS poNumber, dpm.po_line_item_number AS poLine,
            dpm.destination_country AS destination, dpm.shipping_type AS shipmentType,dpm.inventory_segment_code AS inventorySegmentCode,
            dpm.ogac AS ogac ,dpm.gac AS gac, dpm.product_code AS productCode, dpm.item_vas_text AS itemVasText, dpm.item_text as itemText,
            dpm.total_item_qty AS Quantity, dpm.created_at AS dpomCreatedDates, dpm.diverted_to_pos, dpm.factory, dpm.gross_price_fob,
            dpm.trading_net_inc_disc, od.old_val as oldVal`)
            .leftJoin(DpomDifferenceEntity, 'od', `od.po_number = dpm.po_number AND od.po_line_item_number = dpm.po_line_item_number AND od.schedule_line_item_number = dpm.schedule_line_item_number AND od.column_name='total_item_qty'`)
            .where(`diverted_to_pos IS NOT null`)
            // .andWhere(` od.column_name='total_item_qty' `)
            .groupBy(`po_and_line  `)
        return await query.getRawMany()
    }

    async getDivertWithNewDataReport(req: [po: string, line: string]): Promise<any[]> {
        const [po, line] = req;
        const query = this.createQueryBuilder('dpm')
            .select(` id AS nId, LEFT(item, 4) AS item, plant AS nPlant, dpom_item_line_status AS nLineStatus,
            plant_name AS nPlantName, document_date AS nDocumentDate,
            po_number AS npoNumber, po_line_item_number AS npoLine, destination_country AS ndestination,
            shipping_type AS nshipmentType, inventory_segment_code AS ninventorySegmentCode,
            ogac AS nogac, gac AS ngac, product_code AS nproductCode, dpom_item_line_status AS nDPOMLineItemStatus,
            item_vas_text AS nitemVasText, total_item_qty AS nQuantity, created_at AS ndpomCreatedDates, diverted_to_pos,factory,gross_price_fob,trading_net_inc_disc`)
            // .where(`diverted_to_pos IS NOT null`)
            .groupBy(`dpm.po_number AND item`)
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
            .select(` dpom.product_code,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED'`)
            .groupBy(`dpom.product_code`)
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
            .select(` DISTINCT LEFT(dpom.item, 4) as item`)
            .where(`dpom.doc_type_code != :docType AND dpom.item <> ' '`, { docType: 'ZP26' },)
        // .groupBy(`dpom.item`)
        return await query.getRawMany();
    }
    // async getItemforMarketing(): Promise<any[]> {
    //     const query = this.createQueryBuilder('dpom')
    //       .select(`LEFT(dpom.item, 4) AS itemPrefix, dpom.id`)
    //       .where(`dpom.doc_type_code != :docType AND dpom.item <> ' '`, { docType: 'ZP26' })
    //       .groupBy(`itemPrefix`);
    //     return await query.getRawMany();
    //   } while searching whith this item dropdown not showing data


    async getFactoryforMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.factory,dpom.id`)
            .where(`dpom.doc_type_code != :docType AND dpom.factory <> ' '`, { docType: 'ZP26' })
            .groupBy(`dpom.factory`)
        return await query.getRawMany();
    }



    async getPpmProductCodeForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.product_code,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.product_code`)
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
    ///----------------------------------------------------------------------------------------------------------------->fabric tracker 
    async getFabricTrackerForFactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.factory,dpom.id`)
            .groupBy(`dpom.factory`)
        return await query.getRawMany();
    }
    async getFabricTrackerForItem(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.item,dpom.id`)
            .groupBy(`dpom.item`)
        return await query.getRawMany();
    }
    async getFabricTrackerForProductCode(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.productCode,dpom.id`)
            .groupBy(`dpom.productCode`)
        return await query.getRawMany();
    }
    async getFabricTrackerForStyleNumber(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.styleNumber,dpom.id`)
            .groupBy(`dpom.styleNumber`)
        return await query.getRawMany();
    }
    async getFabricTrackerForColorDesc(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.colorDesc,dpom.id`)
            .groupBy(`dpom.colorDesc`)
        return await query.getRawMany();
    }

    async getFactoryPpmData(req: PpmDateFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.po_and_line,dpom.last_modified_date,dpom.item,dpom.factory,dpom.document_date,dpom.po_number,dpom.po_line_item_number,dpom.dpom_item_line_status,dpom.style_number,dpom.product_code,dpom.color_desc,dpom.customer_order,dpom.po_final_approval_date,dpom.plan_no,dpom.lead_time,dpom.category_code,dpom.category_desc,dpom.vendor_code,dpom.gcc_focus_code,dpom.gcc_focus_desc,dpom.gender_age_code,dpom.gender_age_desc,dpom.destination_country_code,dpom.destination_country,dpom.plant,dpom.plant_name,dpom.trading_co_po_no,dpom.upc,dpom.direct_ship_so_no,dpom.direct_ship_so_item_no,dpom.customer_po,dpom.ship_to_customer_no,dpom.ship_to_customer_name,dpom.planning_season_code,dpom.planning_season_year , dpom.pcd,dpom.doc_type_code, dpom.doc_type_desc,dpom.mrgac,dpom.ogac,dpom.gac,dpom.truck_out_date,dpom.origin_receipt_date,dpom.factory_delivery_date,dpom.gac_reason_code,dpom.gac_reason_desc,dpom.shipping_type,dpom.planning_priority_code,dpom.planning_priority_desc,dpom.launch_code,dpom.mode_of_transport_code,dpom.inco_terms,dpom.inventory_segment_code,dpom.purchase_group_code,dpom.purchase_group_name,dpom.total_item_qty,dpom.actual_shipped_qty,dpom.vas_size,dpom.item_vas_text,dpom.item_text,dpom.legal_po_price,dpom.co_price,dpom.pcd,dpom.ship_to_address_legal_po,dpom.ship_to_address_dia,dpom.cab_code,dpom.gross_price_fob,dpom.ne_inc_disc,dpom.trading_net_inc_disc,dpom.actual_unit,dpom.allocated_quantity,dpom.size_description,dpom.size_qty,dpom.trading_co_po_no,dpom.hanger,dpom.legal_po_qty,dpom.geo_code `)
            // .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number')
            .where(`dpom.doc_type_code != 'ZP26' AND dpom.dpom_item_line_status != 'Cancelled'`)
        if (req.lastModifedStartDate !== undefined) {
            query.andWhere(`Date(dpom.last_modified_date) BETWEEN '${req.lastModifedStartDate}' AND '${req.lastModifedEndtDate}'`)
        }
        if (req.documentStartDate !== undefined) {
            query.andWhere(`Date(dpom.document_date) BETWEEN '${req.documentStartDate}' AND '${req.documentEndDate}'`)
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
        if (req.gacStartDate !== undefined) {
            query.andWhere(`Date(dpom.gac) BETWEEN '${req.gacStartDate}' AND '${req.gacEndDate}'`)
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
        if (req.geoCode !== undefined) {
            query.andWhere(`dpom.geo_code ='${req.geoCode}'`)
        }

        return await query.getRawMany();
    }

    async getFabricTrackerReport(req: PpmDateFilterRequest) {
        let query = this.createQueryBuilder('dpom')
            .select(`item,
            po_line_item_number AS poLine,style_number AS styleNumber,pcd,
            product_code AS productCode, total_item_qty AS totalItemQty, factory,document_date AS DocumentDate,
            planning_season_code AS planningSeasonCode,
            planning_season_year AS planningSeasonYear,color_desc AS colorDesc,ogac,gac, mrgac,shipping_type AS shipmentType, po_number AS poNumber, po_line_item_number AS poLineItemNumber`)

        if (req.productCode !== undefined) {
            query.andWhere(`product_code ='${req.productCode}'`)
        }
        if (req.item !== undefined) {
            query.andWhere(`item ='${req.item}'`)
        }
        if (req.factory !== undefined) {
            query.andWhere(`factory ='${req.factory}'`)
        }
        if (req.colorDesc !== undefined) {
            query.andWhere(`color_desc ='${req.colorDesc}'`)
        }
        if (req.styleNumber !== undefined) {
            query.andWhere(`style_number ='${req.styleNumber}'`)
        }

        return await query.getRawMany();

    }

    ///-------------------------------------------------------------------------------------------------------------->ppm marketing
    async getMarketingPpmData(req: PpmDateFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.po_and_line,dpom.last_modified_date,dpom.item,dpom.factory,dpom.document_date,dpom.po_number,dpom.po_line_item_number,dpom.dpom_item_line_status,dpom.style_number,dpom.product_code, dpom.product_name, dpom.color_desc,dpom.customer_order,dpom.po_final_approval_date,dpom.plan_no,dpom.lead_time,dpom.category_code,dpom.category_desc,dpom.vendor_code,dpom.gcc_focus_code,dpom.gcc_focus_desc,dpom.gender_age_code,dpom.gender_age_desc,dpom.destination_country_code,dpom.destination_country,dpom.plant,dpom.plant_name,dpom.trading_co_po_no,dpom.upc,dpom.direct_ship_so_no,dpom.direct_ship_so_item_no,dpom.customer_po,dpom.ship_to_customer_no,dpom.ship_to_customer_name,dpom.planning_season_code,dpom.planning_season_year , dpom.pcd,dpom.doc_type_code, dpom.doc_type_desc,dpom.mrgac,dpom.ogac,dpom.gac,dpom.truck_out_date,dpom.origin_receipt_date,dpom.factory_delivery_date,dpom.gac_reason_code,dpom.gac_reason_desc,dpom.shipping_type,dpom.planning_priority_code,dpom.planning_priority_desc,dpom.launch_code,dpom.mode_of_transport_code,dpom.inco_terms,dpom.inventory_segment_code,dpom.purchase_group_code,dpom.purchase_group_name,dpom.total_item_qty,dpom.actual_shipped_qty,dpom.vas_size,dpom.item_vas_text, dpom.item_vas_pdf, dpom.item_text, dpom.legal_po_price, dpom.legal_po_currency, dpom.co_price, dpom.co_price_currency, dpom.ship_to_address_legal_po,dpom.ship_to_address_dia,dpom.cab_code,dpom.gross_price_fob,dpom.ne_inc_disc,dpom.trading_net_inc_disc,dpom.actual_unit,dpom.allocated_quantity,dpom.size_description,dpom.size_qty,dpom.trading_co_po_no,dpom.net_inc_disc_currency_code, dpom.crm_co_qty, dpom.trading_net_currency_code, dpom.final_destination,
           dpom.fob_currency_code,dpom.hanger,dpom.legal_po_qty, dpom.geo_code, fob.shahi_confirmed_gross_price, fob.shahi_confirmed_gross_price_currency_code, fc.fabric_content, GROUP_CONCAT(DISTINCT od.display_name SEPARATOR ', ') AS displayName `)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number')
            .leftJoin(FobEntity, 'fob', `fob.color_code = SUBSTRING_INDEX(dpom.product_code, '-', -1) AND fob.style_number = dpom.style_number AND fob.size_description = dpom.size_description AND fob.planning_season_code = dpom.planning_season_code`)
            .leftJoin(FabricContent, 'fc', `fc.style = dpom.style_number`)
            .groupBy(`dpom.id`)
            .where(`dpom.ocr_status IS NULL`)
        // .groupBy(`dpom.po_number AND dpom.po_line_item_number AND dpom.size_description`)
        if (req.lastModifedStartDate !== undefined) {
            query.andWhere(`Date(dpom.last_modified_date) BETWEEN '${req.lastModifedStartDate}' AND '${req.lastModifedEndtDate}'`)
        }
        if (req.documentStartDate !== undefined) {
            query.andWhere(`Date(dpom.document_date) BETWEEN '${req.documentStartDate}' AND '${req.documentEndDate}'`)
        }
        if (req.productCode !== undefined) {
            query.andWhere(`dpom.product_code ='${req.productCode}'`)
        }
        if (req.poNumber !== undefined && req.poNumber.length > 0) {
            query.andWhere(`dpom.po_number IN (:...ponumbers)`, { ponumbers: req.poNumber })
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
        if (req.item !== undefined && req.item.length > 0) {
            query.andWhere(` LEFT(dpom.item, 4) IN (:...items)`, { items: req.item })
        }
        if (req.factory !== undefined) {
            query.andWhere(`dpom.factory ='${req.factory}'`)
        }
        if (req.docTypeCode !== undefined) {
            query.andWhere(`dpom.doc_type_code IN (:...docType)`, { docType: req.docTypeCode })
        }
        if (req.poLineItemNumber !== undefined && req.poLineItemNumber.length > 0) {
            query.andWhere(`dpom.po_line_item_number IN (:...lineItemNumbers)`, { lineItemNumbers: req.poLineItemNumber })
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
        if (req.geoCode !== undefined) {
            query.andWhere(`dpom.geo_code ='${req.geoCode}'`)
        }
        if (req.gacStartDate !== undefined) {
            query.andWhere(`Date(dpom.gac) BETWEEN '${req.gacStartDate}' AND '${req.gacEndDate}'`)
        }
        if (req.DPOMLineItemStatus !== undefined && req.DPOMLineItemStatus.length > 0) {
            query.andWhere(`dpom.dpom_item_line_status IN (:...statuses)`, { statuses: req.DPOMLineItemStatus });
        } else if (req.DPOMLineItemStatus !== undefined && req.DPOMLineItemStatus.length === 0) {
            query.andWhere(`1=1`);
        }
        query.orderBy('dpom.document_date DESC, dpom.po_number DESC, dpom.po_line_item_number ASC, dpom.item', 'DESC');
        return await query.getRawMany();
    }

    async getFactoryDataById(poline: string): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.id as docId,dpom.po_and_line as poline`)
            .where(`dpom.po_and_line = :poline`, { poline });
        return await query.getRawMany();
    }

    async getOrderAcceptanceData(req?: PpmDateFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(`dpom.po_and_line,dpom.last_modified_date,dpom.item,dpom.factory,dpom.document_date,dpom.po_number,dpom.po_line_item_number,dpom.dpom_item_line_status,dpom.style_number,dpom.product_code,dpom.color_desc,dpom.customer_order,dpom.po_final_approval_date,dpom.plan_no,dpom.lead_time,dpom.category_code,dpom.category_desc,dpom.vendor_code,dpom.gcc_focus_code,dpom.gcc_focus_desc,dpom.gender_age_code,dpom.gender_age_desc,dpom.destination_country_code,dpom.destination_country,dpom.plant,dpom.plant_name,dpom.trading_co_po_no,dpom.upc,dpom.direct_ship_so_no,dpom.direct_ship_so_item_no,dpom.customer_po,dpom.ship_to_customer_no,dpom.ship_to_customer_name,dpom.planning_season_code,dpom.planning_season_year , dpom.pcd,dpom.doc_type_code, dpom.doc_type_desc,dpom.mrgac,dpom.ogac,dpom.gac,dpom.truck_out_date,dpom.origin_receipt_date,dpom.factory_delivery_date,dpom.gac_reason_code,dpom.gac_reason_desc,dpom.shipping_type,dpom.planning_priority_code,dpom.planning_priority_desc,dpom.launch_code,dpom.mode_of_transport_code,dpom.inco_terms,dpom.inventory_segment_code,dpom.purchase_group_code,dpom.purchase_group_name,dpom.total_item_qty,dpom.actual_shipped_qty,dpom.vas_size,dpom.item_vas_text,dpom.item_text,dpom.legal_po_price,dpom.co_price,dpom.pcd,dpom.ship_to_address_legal_po,dpom.ship_to_address_dia,dpom.cab_code,dpom.gross_price_fob,dpom.ne_inc_disc,dpom.trading_net_inc_disc,dpom.actual_unit,dpom.allocated_quantity,dpom.size_description,dpom.size_qty,dpom.trading_co_po_no,dpom.hanger,dpom.legal_po_qty,dpom.geo_code, dpom.co_line_status `)
            // .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number')
            .where(`dpom.doc_type_code != 'ZP26' AND dpom.dpom_item_line_status != 'Closed' AND dpom.dpom_item_line_status != 'Cancelled' AND dpom.customer_order IS NULL AND (dpom.co_line_status != 'Success' OR dpom.co_line_status IS NULL)`)
        if (req.lastModifedStartDate !== undefined) {
            query.andWhere(`Date(dpom.last_modified_date) BETWEEN '${req.lastModifedStartDate}' AND '${req.lastModifedEndtDate}'`)
        }
        if (req.documentStartDate !== undefined) {
            query.andWhere(`Date(dpom.document_date) BETWEEN '${req.documentStartDate}' AND '${req.documentEndDate}'`)
        }
        if (req.DPOMLineItemStatus !== undefined && req.DPOMLineItemStatus.length > 0) {
            query.andWhere(`dpom.dpom_item_line_status IN (:...statuses)`, { statuses: req.DPOMLineItemStatus });
        } else if (req.DPOMLineItemStatus !== undefined && req.DPOMLineItemStatus.length === 0) {
            query.andWhere(`1=1`);
        }
        if (req.productCode !== undefined) {
            query.andWhere(`dpom.product_code ='${req.productCode}'`)
        }
        if (req.poNumber !== undefined && req.poNumber.length > 0) {
            query.andWhere(`dpom.po_number IN (:...ponumbers)`, { ponumbers: req.poNumber })
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
        if (req.gacStartDate !== undefined) {
            query.andWhere(`Date(dpom.gac) BETWEEN '${req.gacStartDate}' AND '${req.gacEndDate}'`)
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
        if (req.geoCode !== undefined) {
            query.andWhere(`dpom.geo_code ='${req.geoCode}'`)
        }

        return await query.getRawMany();
    }

    //     let query = this.createQueryBuilder('d')
    //         .select(` d.id,d.po_number, d.dpom_item_line_status, d.po_line_item_number, d.schedule_line_item_number, d.size_qty, d.size_description, d.document_date, d.plant_name, d.purchase_group_name, d.product_code, d.category_desc, d.shipping_type,
    //         d.gross_price_fob, d.fob_currency_code, d.mrgac, d.gac, d.total_item_qty, d.po_and_line, d.destination_country,
    //         MAX(CASE WHEN df.display_name = 'MRGAC' THEN df.old_val END) AS MRGAC_OLD,
    //         MAX(CASE WHEN df.display_name = 'MRGAC' THEN df.new_val END) AS MRGAC_NEW,
    //         MAX(CASE WHEN df.display_name = 'totalItemQty' THEN df.new_val END) AS totalItemQty_NEW,
    //         MAX(CASE WHEN df.display_name = 'totalItemQty' THEN df.old_val END) AS totalItemQty_OLD,
    //         MAX(CASE WHEN df.display_name = 'FOBCurrencyCode' THEN df.new_val END) AS FOBCurrencyCode_NEW,
    //         MAX(CASE WHEN df.display_name = 'FOBCurrencyCode' THEN df.old_val END) AS FOBCurrencyCode_OLD,
    //         MAX(CASE WHEN df.display_name = 'grossPriceFOB' THEN df.old_val END) AS grossPriceFOB_OLD,
    //         MAX(CASE WHEN df.display_name = 'grossPriceFOB' THEN df.new_val END) AS grossPriceFOB_NEW,
    //         MAX(CASE WHEN df.display_name = 'GAC' THEN df.old_val END) AS GAC_OLD,
    //         MAX(CASE WHEN df.display_name = 'GAC' THEN df.new_val END) AS GAC_NEW,
    //         MAX(CASE WHEN df.display_name = 'trCoNetIncludingDisc' THEN df.old_val END) AS trCoNetIncludingDisc_OLD,
    //         MAX(CASE WHEN df.display_name = 'trCoNetIncludingDisc' THEN df.new_val END) AS trCoNetIncludingDisc_OLD`)
    //         .leftJoin(DpomDifferenceEntity, 'df', 'df.po_number = d.po_number AND df.po_line_item_number = d.po_line_item_number')
    //         .where(` d.dpom_item_line_status = 'Unaccepted'`)
    //     // .orderBy(`CASE WHEN dpom.dpom_item_line_status = 'Unaccepted' THEN 0 ELSE 1 END`, 'ASC')
    //     if (req.documentStartDate !== undefined) {
    //         query.andWhere(`Date(d.document_date) BETWEEN '${req.documentStartDate}' AND '${req.documentEndDate}'`)
    //     }
    //     if (req.productCode !== undefined) {
    //         query.andWhere(`d.product_code ='${req.productCode}'`)
    //     }
    //     if (req.poandLine !== undefined) {
    //         query.andWhere(`d.po_number ='${req.poandLine}'`)
    //     }
    //     if (req.DPOMLineItemStatus !== undefined) {
    //         query.andWhere(`d.dpom_item_line_status IN (:...statuses)`, { statuses: req.DPOMLineItemStatus });
    //     }
    //     query = query.orderBy(' d.po_number', 'ASC')
    //         .addOrderBy(' d.po_line_item_number', 'ASC')
    //         .addOrderBy(' d.schedule_line_item_number', 'ASC')
    //         .groupBy(` d.po_number, d.po_line_item_number, d.schedule_line_item_number`)
    //     return await query.getRawMany();
    // }

    async getPpmProductCodeForOrderCreation(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.productCode,dpom.id`)
            .where(`dpom.doc_type_code != 'ZP26' AND dpom.dpom_item_line_status != 'Cancelled' AND dpom.customer_order IS NULL AND (dpom.co_line_status != 'Success' OR dpom.co_line_status IS NULL)`)
            .groupBy(`dpom.productCode`)
        return await query.getRawMany();
    }

    async getPoLineforOrderCreation(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_number,dpom.id`)
            .where(`dpom.doc_type_code != 'ZP26' AND dpom.dpom_item_line_status != 'Cancelled' AND dpom.customer_order IS NULL AND (dpom.co_line_status != 'Success' OR dpom.co_line_status IS NULL)`)
            .groupBy(`dpom.po_number`)
        return await query.getRawMany();
    }

    async getStyleNumberForOrderCreation(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.style_number,dpom.id`)
            .where(`dpom.doc_type_code != 'ZP26' AND dpom.dpom_item_line_status != 'Cancelled' AND dpom.style_number IS NOT Null AND dpom.customer_order IS NULL AND (dpom.co_line_status != 'Success' OR dpom.co_line_status IS NULL)`)
            .groupBy(`dpom.style_number`)
        return await query.getRawMany();
    }

    async getPpmPoLineForNikeOrder(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_and_line,dpom.id`)
            .leftJoin(DpomDifferenceEntity, 'od', 'od.po_number = dpom.po_number AND od.po_line_item_number = dpom.po_line_item_number AND od.schedule_line_item_number = dpom.schedule_line_item_number ')
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
            .where(`dpom.po_number IS NOT Null`)
            .groupBy(`dpom.po_number`)
        return await query.getRawMany();
    }
    async getPpmDocTypeForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.doc_type_code,dpom.id`)
            .where(`dpom.doc_type_code IS NOT Null`)
            .groupBy(`dpom.doc_type_code`)
        return await query.getRawMany();
    }
    async getPpmPoLineItemNumberForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_line_item_number,dpom.id`)
            .where(`dpom.po_line_item_number IS NOT Null`)
            .groupBy(`dpom.po_line_item_number`)
        return await query.getRawMany();
    }

    async getPpmStyleNumberForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.style_number,dpom.id`)
            .where(`dpom.style_number IS NOT Null`)
            .groupBy(`dpom.style_number`)
        return await query.getRawMany();
    }

    async getPpmplanningSeasonYearForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.planning_season_year,dpom.id`)
            .where(`dpom.planning_season_year IS NOT Null`)
            .groupBy(`dpom.planning_season_year`)
        return await query.getRawMany();
    }

    async getPpmplanningSeasonCodeForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.planning_season_code,dpom.id`)
            .where(`dpom.planning_season_code IS NOT Null`)
            .groupBy(`dpom.planning_season_code`)
        return await query.getRawMany();
    }

    async getPpmdesCountryNameMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.destination_country,dpom.id`)
            .where(`dpom.destination_country IS NOT Null`)
            .groupBy(`dpom.destination_country`)
        return await query.getRawMany();
    }

    async getPpmGeoCodeMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.geo_code, dpom.id`)
            .where(`dpom.geo_code IS NOT Null`)
            .groupBy(`dpom.geo_code`)
        return await query.getRawMany();
    }

    async getChangeSData(poNumber: number): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(` o.id,o.size_description,o.size_qty,o.po_number,o.legal_po_qty AS legalPoQty,o.gross_price_fob,o.fob_currency_code,o.legal_po_price,o.legal_po_currency,o.po_number,o.po_and_line, (o.legal_po_qty- o.size_qty) AS qty_difference,(o.legal_po_price-o.gross_price_fob) AS price_change
            `)
            .where(`o.po_number = ${poNumber}`)
        //  .andWhere(`o.dpom_item_line_status = 'Unaccepted'`)     
        return await query.getRawMany();
    }

    async getPpmPlantForMarketing(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.plant,dpom.id`)
            .where('dpom.doc_type_code != :docType', { docType: 'ZP26' })
            .groupBy(`dpom.plant`)
        return await query.getRawMany();
    }

    async getfobPriceReportData(req: FobPriceDiffRequest): Promise<any[]> {
        console.log(req.poAndLine)
        const query = this.createQueryBuilder('d')
            .select(` d.po_number as poNumber,d.po_and_line as poAndLine,d.po_line_item_number as poLineItemNumber,d.style_number as styleNumber,d.size_description as sizeDescription,d.gross_price_fob as grossPriceFob,d.fob_currency_code as fobCurrencyCode,f.shahi_confirmed_gross_price as shahiConfirmedgrossPrice, f.shahi_confirmed_gross_price_currency_code as shahiCurrencyCode `)
            .leftJoin(FobEntity, 'f', `f.style_number = d.style_number AND f.size_description = d.size_description AND f.color_code = SUBSTRING_INDEX(d.product_code, '-', -1) AND f.planning_season_code = d.planning_season_code`)
            .where(` d.po_number IS NOT NULL`)
        if (req.poAndLine !== undefined) {
            query.andWhere(` d.po_and_line ='${req.poAndLine}'`)
        }
        if (req.styleNumber !== undefined) {
            query.andWhere(` d.style_number ='${req.styleNumber}'`)
        }
        if (req.sizeDescription !== undefined) {
            query.andWhere(` d.size_description ='${req.sizeDescription}'`)
        }
        return await query.getRawMany();
    }

    async getDataForColine(req: any): Promise<any[]> {
        const query = this.createQueryBuilder('d')
            .select(` d.po_number, d.po_and_line, d.po_line_item_number, d.style_number, d.size_description, d.size_qty, d.destination_country,d.color_desc, d.gross_price_fob, d.gac, f.shahi_confirmed_gross_price as salesPrice, f.shahi_confirmed_gross_price_currency_code as currency `)
            .leftJoin(FobEntity, 'f', `f.style_number = d.style_number AND f.size_description = d.size_description AND f.color_code = SUBSTRING_INDEX(d.product_code, '-', -1) AND f.planning_season_code = d.planning_season_code`)
            .where(` d.po_number ='${req.poNumber}' AND d.po_line_item_number ='${req.lineNumber}'`)
        return await query.getRawMany();
    }

    async getPpmDocTypeForFactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.doc_type_code,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED' AND dpom.doc_type_code IS NOT Null`)
            .groupBy(`dpom.doc_type_code`)
        return await query.getRawMany();
    }

    async getPpmGeoCodeFactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.geo_code, dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED' AND dpom.geo_code IS NOT Null`)
            .groupBy(`dpom.geo_code`)

        return await query.getRawMany();
    }

    async getPpmPoLineItemNumberForFactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.po_line_item_number,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED' AND dpom.po_line_item_number IS NOT Null`)
            .groupBy(`dpom.po_line_item_number`)
        return await query.getRawMany();
    }

    async getPpmStyleNumberForFactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.style_number,dpom.id`)
            .where(`dpom.doc_type_code != 'ZP26' AND dpom.dpom_item_line_status != 'Cancelled' AND dpom.style_number IS NOT Null `)
            .groupBy(`dpom.style_number`)
        return await query.getRawMany();
    }

    async getPpmplanningSeasonCodeForFactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.planning_season_code,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED' AND dpom.planning_season_code IS NOT Null`)
            .groupBy(`dpom.planning_season_code`)
        return await query.getRawMany();
    }

    async getPpmplanningSeasonYearForFactory(): Promise<any[]> {
        const query = this.createQueryBuilder('dpom')
            .select(` dpom.planning_season_year,dpom.id`)
            .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED' AND dpom.planning_season_year IS NOT Null`)
            .groupBy(`dpom.planning_season_year`)
        return await query.getRawMany();
    }

    async getPoLineData(): Promise<any[]> {
        const query = this.createQueryBuilder('d')
            .select(`id , po_number , po_line_item_number , style_number , planning_season_code  , planning_season_year , size_description ,size_qty , geo_code , po_and_line , destination_country_code, gender_age_desc,
            destination_country`)
            // .where(`dpom.doc_type_code <> 'ZP26' AND dpom_item_line_status <> 'CANCELLED'`)
            //  .groupBy(`po_and_line`)
        return await query.getRawMany();
    }

    async getBomInfoAgainstItemStyle(req:BomPrintFilterReq):Promise<any[]>{
        // const items = (req.item).JOIN()
        const itemsParam = req.item.map(item => `'${item}'`).join(',');
        // const styleParam = req.style.map(style => `'${style}'`).join(',');
        const query = this.createQueryBuilder('dpom')
        .select(`style_number,geo_code,destination_country_code,destination_country,po_number,po_line_item_number,LEFT(item,4) AS item,id,size_description,SUM(size_qty) as size_qty`)
        .where(`LEFT(dpom.item,4) IN (${itemsParam})'`) 
        .groupBy(`LEFT(item,4),style_number,geo_code,size_description`)
        .orderBy(`LEFT(item,4)`)
        return await query.getRawMany()
    }
    async getPoLineDataForCihinaInserttag(req:ItemInfoFilterReq): Promise<any[]> {
        const query = this.createQueryBuilder('d')
            .select(`ogac,LEFT(item,4) AS item,id , po_number , po_line_item_number ,
            style_number , planning_season_code  , planning_season_year , size_description ,sum(size_qty) , 
            geo_code , po_and_line , destination_country_code, gender_age_desc,
                       destination_country`)
            .where(`created_at BETWEEN '${req.fromDate}' AND '${req.toDate}' AND item IS NOT NULL AND LEFT(item,4) = '${req.item}' AND geo_code = '${req.region}'`)
            .groupBy(`LEFT(item,4),style_number,geo_code,ogac`)
           return await query.getRawMany();
    }



}