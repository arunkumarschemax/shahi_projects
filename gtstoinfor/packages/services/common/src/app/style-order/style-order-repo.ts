import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StyleOrder } from "./style-order.entity";

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

}