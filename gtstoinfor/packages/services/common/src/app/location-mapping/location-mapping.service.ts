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
                // console.log(res, '>>>>>>>>>>>>>>>');
                return new CommonResponseModel(true, 1111, "Data retrived Succesufully", res);
            }
        } catch (err) {
            return err;
        }
    }

    async getAllFabrics(): Promise<CommonResponseModel> {
        try {

            let dataquery = `SELECT *,
            g.grn_number,
            ven.vendor_code,
            ven.vendor_name,
            sty.style,
            sty.description,
            pro_grp.product_group,
            m3_it.item_code,
            m3_it.content
            
            FROM grn_items AS grn_it
            
            LEFT JOIN grn AS g ON g.grn_id = grn_it.grn_id
            LEFT JOIN vendors AS ven ON ven.vendor_id = g.vendor_id
            LEFT JOIN style AS sty ON sty.style_id = g.style_id
            LEFT JOIN product_group AS pro_grp ON pro_grp.product_group_id = grn_it.product_group_id
            LEFT JOIN m3_items AS m3_it ON m3_it.m3_items_id = grn_it.m3_item_id`

            const res = await AppDataSource.query(dataquery);
            if (res) {
                console.log(res, '>>>>>>>>>>>>>>>');
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
            stk_lg.quantity,
            m3_it.item_code,
            m3_it.content,
            rk_po.rack_position_name,
            rk_po.status
            
            FROM stock_log AS stk_lg
            
            LEFT JOIN rack_position AS rk_po ON rk_po.position_id = stk_lg.location_id
            LEFT JOIN m3_items AS m3_it ON m3_it.m3_items_id = stk_lg.m3_item_code
            
            WHERE grn_item_id = '${req.id}'`;

            const res = await AppDataSource.query(dataquery);
            if (res) {
                console.log(res, '>>>>>>>>>>>>>>>');
                return new CommonResponseModel(true, 1111, "Data retrived Succesufully", res);
            }


        } catch (error) {
            return error;
        }
    }

    async postToStockLogs(req: LocationMappingReq) {
        try {
            let dataquery = `Insert into stock_log (m3_item_code, shahi_item_code, item_type_id, location_id, plant_id, grn_item_id, quantity) values (${req.m3_item_code},${req.shahi_item_code}, ${req.item_type_id},${req.location_id},${req.plant_id},${req.grn_item_id},${req.quantity})`

            const res = await AppDataSource.query(dataquery);
            if (res) {
                console.log(res.affectedRows, '>>>>>>>>>>>>>>>');
                if (res.affectedRows > 0) {
                    return new CommonResponseModel(true, 1111, "Data posted Succesufully");
                }

            }
        } catch (error) {
            return error;
        }
    }

    async updateRackLocationStatus(req:RackLocationStatusReq){
        console.log(req, "requesttttttttttttttttttttttt");
    }

}