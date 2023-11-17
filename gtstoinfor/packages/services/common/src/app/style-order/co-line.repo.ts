import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderLine } from "./order-line.entity";
import { styleOrderReq } from "@project-management-system/shared-models";
import { StyleOrder } from "./style-order.entity";
import { CoLine } from "./co-line.entity";
import { UomEntity } from "../uom/uom-entity";

@Injectable()
export class CoLineRepository extends Repository<CoLine> {

    constructor(@InjectRepository(CoLine) private CoLineRepo: Repository<CoLine>
    ) {
        super(CoLineRepo.target, CoLineRepo.manager, CoLineRepo.queryRunner);
    }
    
    async getAllCoLines(req: styleOrderReq):Promise<any>{       
        const query = await this.createQueryBuilder('co')
        .select(`co.order_quantity,co.sale_price,co.colour,co.size,co.destination,u.uom,co.co_number,co.co_line_number,co.sku_code,co.status,co.exf_date,co.delivery_date,co.buyer_po_number,co.season_code`)
        .leftJoin(StyleOrder,'c','c.co_id = co.co_id ')
        .leftJoin(UomEntity,'u','`u`.`id` = `co`.`uom_id` ')
        .where(`co.co_id =${req.coId}`)
        if (req?.itemId !== undefined) {
            query.andWhere(`c.fg_item_id ='${req.itemId}'`)
        }
        return query.getRawMany()
    }



}