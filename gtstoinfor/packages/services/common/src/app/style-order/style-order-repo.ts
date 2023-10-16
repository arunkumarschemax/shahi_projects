import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StyleOrder } from "./style-order.entity";
import { styleOrderReq } from "@project-management-system/shared-models";
import { CoLine } from "./co-line.entity";

@Injectable()
export class StyleOrderRepository extends Repository<StyleOrder> {

    constructor(@InjectRepository(StyleOrder) private styleorderRepo: Repository<StyleOrder>
    ) {
        super(styleorderRepo.target, styleorderRepo.manager, styleorderRepo.queryRunner);
    }

    async getAllCOCount(): Promise<any> {
        const query =  this.createQueryBuilder('co')
            .select(`MAX(id) as id `)
            .orderBy(`created_at`, 'DESC')
        return await query.getRawOne()

    }
    
    async getAllStyleOrders(req: styleOrderReq):Promise<any>{
        const query = await this.createQueryBuilder('co')
        .select(`item_code,co_number,package_terms_id,agent,discount_amount,discount_per,discount_per,Payment_terms_id,facility_id,warehouse_id,currency_id,order_date,Payment_method_id,instore_date,co.sale_price,buyer_po_number,shipment_type,buyer_style,exfactory_date,buyer_id,delivery_terms_id,delivery_method_id,price_quantity,SUM(c.order_quantity)AS qty,co.id`)
        .leftJoin(CoLine,'c','c.co_id = co.id ')
        // .where(`co.item_id =${req.itemId}`)
        .groupBy(`co.buyer_id`)
        return query.getRawMany()
    }

}