import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../app-datasource";
import { CommonResponseModel, LocationMappingReq, MaterialIssueIdreq, RackLocationStatusReq, StockTypeEnum } from "@project-management-system/shared-models";
import { StocksEntity } from "../stocks/stocks.entity";
import { StocksRepository } from "../stocks/repository/stocks.repository";
import { StockLogEntity } from "../stocks/stock-log-entity";
import { StockLogRepository } from "../stocks/repository/stock-log.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class LocationMappingService {

    constructor(

    @InjectRepository(StockLogEntity)
    private stockLogRepository: Repository<StockLogEntity>,
    @InjectRepository(StocksEntity)
    private stocksRepository: Repository<StocksEntity>,



       
      ) { }

      
    async getAllActiveRackPositions(): Promise<CommonResponseModel> {
        try {
            let dataquery = `SELECT * FROM rack_position WHERE status != 'OCCUPIED'`;
            const res = await AppDataSource.query(dataquery);
            if (res) {
                return new CommonResponseModel(true, 1111, "Data retrived Succesufully", res);
            }
        } catch (err) {
            return err;
        }
    }

    async getAllFabrics(): Promise<CommonResponseModel> {
        try {

            // let dataquery = `SELECT 
            // grn_it.grn_item_id,
            // grn_it.grn_id,
            // grn_it.m3_item_code_id,
            // grn_it.received_quantity,
            // grn_it.accepted_quantity,
            // grn_it.rejected_quantity,
            // grn_it.conversion_quantity,
            // grn_it.uom_id,
            // grn_it.location_mapped_status,
            // g.grn_number,
            // ven.vendor_code,
            // ven.vendor_name,
            // sty.style_id,
            // sty.style,
            // sty.description,
    
            // it.item_name,
            // it.item_code,
            // buyer.buyer_name AS trimBuyerName,
            // buyers.buyer_name AS fabBuyerName,
            // m3items.m3_items_Id,
            //  m3items.item_code AS m3_item_code,
            //  m3trims.trim_code AS m3_trim_code,
            //  m3trims.m3_trim_Id,
            //  sare.buyer_id AS fabricBuyerid,
            //  saree.buyer_id AS trimBuyerId,
            //  g.item_type,
            //  m3items.description AS m3itemDescription,

            // COALESCE(SUM(stk_log.quantity), 0) AS quantity,
            // uom.uom AS acceptedUOM
            
            // FROM grn_items AS grn_it
            
            // LEFT JOIN grn AS g ON g.grn_id = grn_it.grn_id
            // LEFT JOIN vendors AS ven ON ven.vendor_id = g.vendor_id
            // LEFT JOIN style AS sty ON sty.style_id = g.style_id
            // LEFT JOIN items AS it ON it.item_id = grn_it.item_id
            // LEFT JOIN stock_log AS stk_log ON stk_log.grn_item_id = grn_it.grn_item_id
            // LEFT JOIN purchase_order AS po ON po.purchase_order_id = g.po_id
            // LEFT JOIN purchase_order_fabric AS pofab ON pofab.po_fabric_id = po.purchase_order_id
            // LEFT JOIN purchase_order_trim AS potrim ON potrim.po_trim_id = po.purchase_order_id
            // LEFT JOIN indent_fabric AS indfab ON indfab.ifabric_id = pofab.indent_fabric_id
            // LEFT JOIN indent_trims AS indtrim ON indtrim.itrims_id = potrim.indent_trim_id
            // LEFT JOIN indent AS ind ON ind.indent_id = indfab.indent_id
            // LEFT JOIN indent AS indi ON indi.indent_id = indtrim.indent_id
            // LEFT JOIN sample_request AS sare ON sare.sample_request_id = ind.sample_request_id
            // LEFT JOIN sample_request AS saree ON saree.sample_request_id = indi.sample_request_id
            
             
            
            
            // LEFT JOIN buyers AS buyer ON buyer.buyer_id = sare.buyer_id
            // LEFT JOIN buyers AS buyers ON buyers.buyer_id = saree.buyer_id
            // LEFT JOIN  m3_items AS m3items ON m3items.m3_items_Id = grn_it.m3_item_code_id AND g.item_type = "Fabric"
            // LEFT JOIN  m3_trims AS m3trims ON m3trims.m3_trim_Id = grn_it.m3_item_code_id AND g.item_type =!"Fabric"
            // LEFT JOIN  uom AS uom ON uom.id = grn_it.received_uom_id
            
            
            // GROUP BY grn_item_id`

            let query = `SELECT gi.uom_id AS uomId, u.uom AS uom, gi.grn_item_id As grnItemId,g.item_type AS materialType, (gi.accepted_quantity - SUM(st.quantity)) AS balance, SUM(st.quantity) AS allocatedQty, IF(g.item_type = "FABRIC", mit.m3_items_id, mtr.m3_trim_id) AS itemId,
            IF(g.item_type = "FABRIC", mit.item_code, mtr.trim_code) AS itemCode, g.grn_number AS grnNumber, v.vendor_name, gi.accepted_quantity AS acceptedQuantity,
            IF(g.grn_type = "INDENT" AND g.item_type = "FABRIC", idfb.buyer_id, IF(g.grn_type = "INDENT" AND g.item_type != "FABRIC", idtb.buyer_id, IF(g.grn_type = "SAMPLE_ORDER" AND g.item_type = "FABRIC",sprfb.buyer_id,sprtb.buyer_id))) AS buyerId, IF(g.grn_type = "INDENT" AND g.item_type = "FABRIC", idfb.buyer_name, IF(g.grn_type = "INDENT" AND g.item_type != "FABRIC", idtb.buyer_name, IF(g.grn_type = "SAMPLE_ORDER" AND g.item_type = "FABRIC",sprfb.buyer_name,sprtb.buyer_name))) AS buyerName
            FROM grn_items gi LEFT JOIN grn g ON g.grn_id = gi.grn_id 
            LEFT JOIN vendors v ON v.vendor_id = g.vendor_id
            LEFT JOIN m3_items mit ON mit.m3_items_id AND g.item_type = "FABRIC"
            LEFT JOIN m3_trims mtr ON mtr.m3_trim_Id AND g.item_type != "FABRIC"
            LEFT JOIN stock_log st ON st.grn_item_id = gi.grn_item_id
            LEFT JOIN  sample_request_fabric_info spf ON spf.fabric_info_id = gi.sample_item_id AND g.grn_type = "SAMPLE_ORDER" AND g.item_type = "FABRIC"
            LEFT JOIN  sample_request_trim_info spt ON spt.trim_info_id = gi.sample_item_id AND g.grn_type = "SAMPLE_ORDER" AND g.item_type != "FABRIC"
            LEFT JOIN  sample_request sprf ON sprf.sample_request_id = spf.sample_request_id
            LEFT JOIN  sample_request sprt ON sprf.sample_request_id = spt.sample_request_id
            LEFT JOIN  buyers sprfb ON sprfb.buyer_id = sprf.buyer_id
            LEFT JOIN  buyers sprtb ON sprt.buyer_id = sprt.buyer_id
            LEFT JOIN  indent_fabric indf ON indf.ifabric_id = gi.indent_item_id AND g.grn_type = "INDENT" AND g.item_type = "FABRIC"
            LEFT JOIN  indent_trims indt ON indt.itrims_id = gi.indent_item_id AND g.grn_type = "INDENT" AND g.item_type != "FABRIC"
            LEFT JOIN  indent idf ON idf.indent_id = indf.indent_id
            LEFT JOIN  indent idt ON idt.indent_id = indt.indent_id
            LEFT JOIN  buyers idfb ON idfb.buyer_id = idf.buyer_id
            LEFT JOIN  buyers idtb ON idtb.buyer_id = idt.buyer_id
            LEFT JOIN  uom u ON u.id = gi.uom_id
            GROUP BY gi.grn_item_id`

            const res = await AppDataSource.query(query);
            if (res) {
                return new CommonResponseModel(true, 1111, "Data retrived Succesufully", res);
            }

        } catch (error) {
            return error;
        }
    }

    async getOneItemAllocateDetails(req: MaterialIssueIdreq): Promise<CommonResponseModel> {
        console.log(req, "id");
        try {
            let dataquery = `SELECT 
            stk_lg.stock_log_id,
            stk_lg.m3_item,
            stk_lg.buyer_id,
            stk_lg.uom_id,
            stk_lg.item_type,
            stk_lg.location_id,
            stk_lg.quantity,
            stk_lg.grn_item_id,
            stk_lg.stock_id,
            SUM(stk_lg.quantity) AS total_quantity,
            m3_it.item_code,
            m3_it.content,
            rk_po.rack_position_name,
            rk_po.status
        FROM 
            stock_log AS stk_lg
        LEFT JOIN 
            rack_position AS rk_po ON rk_po.position_id = stk_lg.location_id
            LEFT JOIN 
            m3_items AS m3_it ON m3_it.m3_items_id = stk_lg.m3_item
        WHERE 
            stk_lg.grn_item_id = '${req.id}'
        GROUP BY 
            stk_lg.location_id,
            rk_po.rack_position_name,
            rk_po.status;`;

            const res = await AppDataSource.query(dataquery);
            if (res) {
                return new CommonResponseModel(true, 1111, "Data retrived Succesufully", res);
            }


        } catch (error) {
            return error;
        }
    } 

    async getAllCount(): Promise<any> {
        const query =  `SELECT MAX(id) AS id
        FROM stocks
        ORDER BY created_at DESC`;
        const res = await AppDataSource.query(query)
        if (res) {
            return new CommonResponseModel(true, 1111, "Data retrived Succesufully", res);
        }
    }



    async postToStockLogs(req: LocationMappingReq) {
        const data = await this.getAllCount();
        console.log(data,"data")
        console.log(data.data[0].id,"data")
         const maxId = data.data[0].id
        try {
            const stock_bar_code = `${req.item_type}/${req.description}/${req.quantity}${req.uomName}/000${maxId+1}`;
            let saveStock :StocksEntity = undefined;
            let stockEntity = new StocksEntity();
            stockEntity.allocateQuanty = 0;
            stockEntity.buyerId = req.buyer_id
            stockEntity.grnItemId = req.grn_item_id;
            stockEntity.issuedQuantity = 0;
            stockEntity.itemType = req.item_type;
            stockEntity.locationId = req.location_id;
            stockEntity.quantity = req.quantity;
            stockEntity.styleId = req.style_id;
            stockEntity.m3Item = req.m3_item;
            stockEntity.stockType = StockTypeEnum.STOCK;
            stockEntity.uomId = req.uom_id;
            stockEntity.stockBarCode = stock_bar_code;
            // stockEntity.uuid = '';
            saveStock = await this.stocksRepository.save(stockEntity)
            if(saveStock){
                let stockLogEntity = new StockLogEntity();
                stockLogEntity.buyerId = req.buyer_id
                stockLogEntity.grnItemId = req.grn_item_id;
                stockLogEntity.itemType = req.item_type;
                stockLogEntity.locationId = req.location_id;
                stockLogEntity.quantity = req.quantity;
                stockLogEntity.m3Item = req.m3_item;
                stockLogEntity.uomId = req.uom_id;
                stockLogEntity.stockId = saveStock.id;
                let saveStockLog = await this.stockLogRepository.save(stockLogEntity)
                if(saveStockLog){
                    return new CommonResponseModel(true, 1111, "Data posted Succesufully");
                }
                else {
                    return new CommonResponseModel(false, 10005, "Data not posted");
                }
            }   
            else {
                return new CommonResponseModel(false, 10005, "Data not posted");
            }




            // let dataquery = `INSERT INTO stocks (m3_item, quantity, style_id, uom_id, location_id, buyer_id, item_type, grn_item_id,stock_bar_code) VALUES (${req.m3_item}, ${req.quantity}, ${req.style_id}, ${req.uom_id}, ${req.location_id}, ${req.buyer_id}, '${req.item_type}' , ${req.grn_item_id} , '${stock_bar_code}') `
            // const res = await AppDataSource.query(dataquery);
            // if (res) {
            //     if (res.affectedRows > 0) {
            //         const dataquery2 = `INSERT INTO stock_log (m3_item, item_type, location_id, grn_item_id, quantity,buyer_id,uom_id) VALUES (${req.m3_item}, '${req.item_type}', ${req.location_id}, ${req.grn_item_id}, ${req.quantity},${req.buyer_id},${req.uom_id})`

            //         const res2 = await AppDataSource.query(dataquery2);

            //         if (res2) {
            //             if (res.affectedRows > 0) {
            //                 return new CommonResponseModel(true, 1111, "Data posted Succesufully");
            //             }
            //         }
            //     } else {
            //         return new CommonResponseModel(false, 10005, "Data not posted");
            //     }

            // }
        } catch (error) {
            return error;
        }
    }

    

    async updateRackLocationStatus(req: RackLocationStatusReq) {
        try {
            const dataquery = `UPDATE rack_position
            SET STATUS = '${req.locationStatusValue}', is_active = "${req.isActive}"
            WHERE position_Id = '${req.locationId}'`

            const res = await AppDataSource.query(dataquery);
            if (res) {
                if (res.affectedRows > 0) {
                    return new CommonResponseModel(true, 1111, "Rack position updated Succesufully");
                } else {
                    return new CommonResponseModel(false, 10005, "Rack position not updated");
                }
            }

        } catch (error) {
            return error;
        }
    }

}