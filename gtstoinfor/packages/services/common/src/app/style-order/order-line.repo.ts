import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderLine } from "./order-line.entity";
import { styleOrderReq } from "@project-management-system/shared-models";
import { StyleOrder } from "./style-order.entity";

@Injectable()
export class OrderLineRepository extends Repository<OrderLine> {

    constructor(@InjectRepository(OrderLine) private OrderLineRepo: Repository<OrderLine>
    ) {
        super(OrderLineRepo.target, OrderLineRepo.manager, OrderLineRepo.queryRunner);
    }
    
    async getAllOrderLines(req: styleOrderReq):Promise<any>{
       console.log(req,'cooo');
       
        const query = await this.createQueryBuilder('co')
        .select(` co.size,co.color,co.destination,co.order_quantity,co.sale_price,co.uom`)
        .leftJoin(StyleOrder,'c','c.co_id = co.co_id ')
        .where(`co.co_id =${req.coId}`)
        if (req?.itemId !== undefined) {
            query.andWhere(`c.fg_item_id ='${req.itemId}'`)
        }
        return query.getRawMany()
    }

}