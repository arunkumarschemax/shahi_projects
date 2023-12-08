
import { Injectable } from "@nestjs/common";
import { RLOrdersRepository } from "./repositories/rl-orders.repo";
import { CommonResponseModel, FactoryReportModel, FactoryReportSizeModel } from "@project-management-system/shared-models";
import { DataSource } from "typeorm";
import { PdfFileUploadRepository } from "./repositories/pdf-file.repo";

@Injectable()
export class RLOrdersService {
    constructor(
        private repo: RLOrdersRepository,
        private pdfrepo:PdfFileUploadRepository,
        private dataSource: DataSource,
       
    ) {}


    async getPdfFileInfo() : Promise<CommonResponseModel> {
        try{
          const data = await this.pdfrepo.find()
         
          if(data){
            return new CommonResponseModel(true, 1,'data retrived Successfully',data)
          } else {
            return new CommonResponseModel(false,0 ,'No Data Found',[])
          }
        } catch(err){
          throw err
        }
      }


      async getorderData(): Promise<CommonResponseModel> {
        try {
            const Details = await this.repo.getPdfFileInfo();
            console.log(Details,"88888888")

            // const filteredDetails = allDetails.filter(record => record.doc_type_code !== 'ZP26')
            // const details = filteredDetails.filter(record => record.dpom_item_line_status !== 'Cancelled')
            // if (details.length === 0) {
            //     return new CommonResponseModel(false, 0, 'data not found');
            // }
            // const sizeDateMap = new Map<string, FactoryReportModel>();   //OrderDataModel
            // for (const rec of details) {
            //     if (!sizeDateMap.has(rec.po_and_line)) {
            //         sizeDateMap.set(
            //             rec.po_and_line,
            //             new FactoryReportModel(rec.last_modified_date, rec.item, rec.factory, rec.document_date, rec.po_number, rec.po_line_item_number, rec.po_and_line, rec.dpom_item_line_status, rec.style_number, rec.product_code, rec.color_desc, rec.customer_order, rec.po_final_approval_date, rec.plan_no, rec.lead_time, rec.category_code, rec.category_desc, rec.vendor_code, rec.gcc_focus_code, rec.gcc_focus_desc, rec.gender_age_code, rec.gender_age_desc, rec.destination_country_code, rec.destination_country, rec.plant, rec.plant_name, rec.trading_co_po_no, rec.upc, rec.direct_ship_so_no, rec.direct_ship_so_item_no, rec.customer_po, rec.ship_to_customer_no, rec.ship_to_customer_name, rec.planning_season_code, rec.planning_season_year, rec.doc_type_code, rec.doc_type_desc, rec.mrgac, rec.ogac, rec.gac, rec.truck_out_date, rec.origin_receipt_date, rec.factory_delivery_date, rec.gac_reason_code, rec.gac_reason_desc, rec.shipping_type, rec.planning_priority_code, rec.planning_priority_desc, rec.launch_code, rec.mode_of_transport_code, rec.inco_terms, rec.inventory_segment_code, rec.purchase_group_code, rec.purchase_group_name, rec.total_item_qty, rec.actual_shipped_qty, rec.vas_size, rec.item_vas_text, rec.item_text, rec.legal_po_price, rec.co_price, rec.pcd, rec.ship_to_address_legal_po, rec.ship_to_address_dia, rec.cab_code, rec.gross_price_fob, rec.ne_inc_disc, rec.trading_net_inc_disc, rec.displayName, rec.actual_unit, rec.allocated_quantity, rec.pcd, rec.fobCurrCode, rec.netIncDisCurrency, rec.tradingNetCurrencyCode, rec.hanger, rec.quantity, rec.geo_code, [])
            //         );
            //     }
            //     const sizeWiseData = sizeDateMap.get(rec.po_and_line).sizeWiseData;
            //     if (rec.size_description !== null) {
            //         sizeWiseData.push(new FactoryReportSizeModel(rec.size_description, rec.size_qty, rec.legal_po_price, rec.co_price));
            //     }
            // }
            // const dataModelArray: FactoryReportModel[] = Array.from(sizeDateMap.values());
            return new CommonResponseModel(true, 1, 'data retrieved', Details);
        } catch (e) {
            return new CommonResponseModel(false, 0, 'failed', e);
        }
    }
 }
        

    





