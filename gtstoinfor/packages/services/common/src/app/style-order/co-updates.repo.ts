import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoUpdateEntity } from "./co-updates.entity";
import { CoRequest } from "@project-management-system/shared-models";
import { CoLine } from "./co-line.entity";

@Injectable()
export class CoUpdateRepository extends Repository<CoUpdateEntity> {

    constructor(@InjectRepository(CoUpdateEntity) private CoUpdateRepo: Repository<CoUpdateEntity>
    ) {
        super(CoUpdateRepo.target, CoUpdateRepo.manager, CoUpdateRepo.queryRunner);
    }

// async getCoamendment():Promise<any>{
//     const query = await this.createQueryBuilder('co')
//     .select('co.co_update_id as coUpdateId, co.co_number as coNumber, co.co_line_id as coLineId, co.co_id as coId, co.old_value as oldValue, co.updated_value as updatedValue, co.parameter as parameter,line.co_line_id as coLineId, line.coline_number as coLineNumber, line.delivery_address as deliveryAddress , line.order_quantity as orderQuantity, line.color as color, line.size as size, line.destination as destination, line.uom as uom, line.status as status, line.discount as discount , line.sale_price as salePrice, line.co_percentage as coPercentage, line.sku_code as skuCode ')
//     .leftJoin(CoLine, 'line','line.co_id = co.co_id')

//     return await query.getRawMany()
// }

async getCoamendment(): Promise<any> {
    const query = await this.createQueryBuilder('co')
        .select('co.co_update_id as coUpdateId, co.co_number as coNumber, co.co_line_id as coLineId, co.co_id as coId, co.old_value as oldValue, co.updated_value as updatedValue, co.parameter as parameter,  line.co_line_id as coLineId,  line.co_line_number as coLineNumber, line.delivery_address as deliveryAddress , line.order_quantity as orderQuantity, line.color as color, line.size as size, line.destination as destination, line.uom_id as uom, line.status as status, line.discount as discount , line.sale_price as salePrice, line.co_percentage as coPercentage, line.sku_code as skuCode ')
        .leftJoin(CoLine, 'line', 'line.co_id = co.co_id AND line.co_line_id = co.co_line_id'); 

    return await query.getRawMany();
}
async getconumber(req:CoRequest):Promise<any>{
    const query= await this.createQueryBuilder()
    .select('coNumber,coId')
    .groupBy('coId')
    .where(`coId=:coNumber`,{coNumber:req.coNumber})
    return await query.getRawMany()
}
}