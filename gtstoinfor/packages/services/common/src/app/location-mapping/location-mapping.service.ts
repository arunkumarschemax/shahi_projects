import { Injectable } from "@nestjs/common";
import { AppDataSource } from "../app-datasource";
import { CommonResponseModel } from "@project-management-system/shared-models";

@Injectable()
export class LocationMappingService {
    async getAllActiveRackPositions():Promise<CommonResponseModel> {
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
}