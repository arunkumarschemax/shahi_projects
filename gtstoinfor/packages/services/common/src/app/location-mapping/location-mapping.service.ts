import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../app-datasource";
import { CommonResponseModel, LocationMappingReq, MaterialIssueIdreq, RackLocationStatusReq } from "@project-management-system/shared-models";

@Injectable()
export class LocationMappingService {
    async getAllActiveRackPositions(): Promise<CommonResponseModel> {
        try {
            let dataquery = `SELECT * FROM rack_position WHERE is_active = '1'`;
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

            let dataquery = `SELECT 
            grn_it.grn_item_id,
            grn_it.grn_id,
            grn_it.item_id,
            grn_it.received_quantity,
            grn_it.received_uom_id,
            grn_it.accepted_quantity,
            grn_it.accepted_uom_id,
            grn_it.rejected_quantity,
            grn_it.rejected_uom_id,
            grn_it.conversion_quantity,
            grn_it.conversion_uom_id,
            grn_it.location_mapped_status,
            g.grn_number,
            ven.vendor_code,
            ven.vendor_name,
            sty.style_id,
            sty.style,
            sty.description,
            pro_grp.product_group,
            it.item_name,
            it.item_code,
            po.buyer_id,
            buyer.buyer_name,
            
            COALESCE(SUM(stk_log.quantity), 0) AS quantity
            
            FROM grn_items AS grn_it
            
            LEFT JOIN grn AS g ON g.grn_id = grn_it.grn_id
            LEFT JOIN vendors AS ven ON ven.vendor_id = g.vendor_id
            LEFT JOIN style AS sty ON sty.style_id = g.style_id
            LEFT JOIN product_group AS pro_grp ON pro_grp.product_group_id = grn_it.product_group_id
            LEFT JOIN items AS it ON it.item_id = grn_it.item_id
            LEFT JOIN stock_log AS stk_log ON stk_log.grn_item_id = grn_it.grn_item_id
            LEFT JOIN purchase_order AS po ON po.purchase_order_id = g.po_id
            LEFT JOIN buyers AS buyer ON buyer.buyer_id = po.buyer_id
            
            GROUP BY grn_item_id`

            const res = await AppDataSource.query(dataquery);
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
            stk_lg.m3_item_code,
            stk_lg.shahi_item_code,
            stk_lg.item_type_id,
            stk_lg.location_id,
            stk_lg.plant_id,
            stk_lg.grn_item_id,
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
            m3_items AS m3_it ON m3_it.m3_items_id = stk_lg.m3_item_code
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

    async postToStockLogs(req: LocationMappingReq) {
        try {
            let dataquery = `INSERT INTO stocks (m3_style_id, item_type_id, item_id, quantity, location_id, style_id,buyer_id) VALUES (${req.m3_style_id},${req.item_type_id},${req.item_id},${req.quantity}, ${req.location_id}, ${req.style_id},${req.buyer_id})`
            const res = await AppDataSource.query(dataquery);
            if (res) {
                if (res.affectedRows > 0) {
                    const dataquery2 = `INSERT INTO stock_log (m3_item_code, shahi_item_code, item_type_id, location_id, plant_id, grn_item_id, quantity,buyer_id) VALUES (${req.m3_item_code}, ${req.shahi_item_code}, ${req.item_type_id}, ${req.location_id}, ${req.plant_id}, ${req.grn_item_id}, ${req.quantity},${req.buyer_id})`

                    const res2 = await AppDataSource.query(dataquery2);

                    if (res2) {
                        if (res.affectedRows > 0) {
                            return new CommonResponseModel(true, 1111, "Data posted Succesufully");
                        }
                    }
                } else {
                    return new CommonResponseModel(false, 10005, "Data not posted");
                }

            }
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