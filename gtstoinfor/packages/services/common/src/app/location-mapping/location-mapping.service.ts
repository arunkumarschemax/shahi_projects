import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../app-datasource";
import { CommonResponseModel } from "@project-management-system/shared-models";

@Injectable()
export class LocationMappingService {
    async getAllActiveRackPositions(): Promise<CommonResponseModel> {
        try {
            let dataquery = `SELECT position_id, rack_position_name, position_code, rack_name, is_active FROM rack_position WHERE is_active = "1"`;
            const res = await AppDataSource.query(dataquery);
            if (res) {
                // console.log(res, '>>>>>>>>>>>>>>>');
                return new CommonResponseModel(true, 1111, "Data retrived Succesufully", res);
            }
        } catch (err) {
            return err;
        }
    }

    async getAllFabrics():Promise<CommonResponseModel> {
        try {

            let dataquery = `SELECT * ,
            grn.grn_id,
            grn.grn_number,
            ven.vendor_name,
            col.colour,
            pro_grp.product_group
            FROM grn_fabric AS grn_fab
            LEFT JOIN grn AS grn ON grn.grn_id = grn_fab.grn_id
            LEFT JOIN vendors AS ven ON ven.vendor_id = grn.vendor_id
            LEFT JOIN colour AS col ON col.colour_id = grn_fab.colour_id
            LEFT JOIN product_group AS pro_grp ON pro_grp.product_group_id = grn_fab.product_group_id`

            const res = await AppDataSource.query(dataquery);
            if (res) {
                console.log(res, '>>>>>>>>>>>>>>>');
                return new CommonResponseModel(true, 1111, "Data retrived Succesufully", res);
            }

        } catch (error) {
            return error;
        }
    }

}