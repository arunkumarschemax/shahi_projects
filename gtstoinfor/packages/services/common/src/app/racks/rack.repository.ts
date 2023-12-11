import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { RacksEntity } from "./rack.entity";
import { RackPositionEntity } from "../rm_locations/rack-position.entity";
import { RackIdRequest } from "../rm_locations/rack-id.request";


@Injectable()
export class RacksRepo extends Repository<RacksEntity> {
    
    async getRackDetails(req:RackIdRequest): Promise<any> {
        const query = await this.createQueryBuilder('racks')
            .select(`racks.rack_id as rackId,racks.rack_name AS rackName,racks.rack_code AS rackCode,count(rp.position_id) AS totalBins`)
            .leftJoin(RackPositionEntity,'rp','rp.rack_id=racks.rack_id')
            .where(`racks.rack_id =`+req.rackId)
            const data=await query.getRawMany()
        return data;
    }

}