import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoLine } from "./co-line.entity";
import { styleOrderReq } from "@project-management-system/shared-models";
import { StyleOrder } from "./style-order.entity";

@Injectable()
export class CoLineRepository extends Repository<CoLine> {

    constructor(@InjectRepository(CoLine) private CoLineRepo: Repository<CoLine>
    ) {
        super(CoLineRepo.target, CoLineRepo.manager, CoLineRepo.queryRunner);
    }
async getAllCoLines(req: styleOrderReq):Promise<any>{
       console.log(req,'cooo');
       
        const query = await this.createQueryBuilder('co')
        .select(` co.size,co.color,co.destination,co.order_quantity,co.sale_price,co.coline_number,co.status,co.uom`)
        .leftJoin(StyleOrder,'c','c.co_id = co.co_id ')
        .where(`co.co_id =${req.coId}`)
        if (req?.itemId !== undefined) {
            query.andWhere(`c.fg_item_id ='${req.itemId}'`)
        }
        return query.getRawMany()
    }

}