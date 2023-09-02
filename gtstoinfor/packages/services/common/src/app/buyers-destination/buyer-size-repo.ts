import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Style } from "../style/dto/style-entity";
import { BuyersDestionations } from "./buyers-destination.entity";
import { Destination } from "../destination/destination.entity";
import { Size } from "../sizes/sizes-entity";
import { Buyers } from "../buyers/buyers.entity";
import { BuyersColor } from "./byers-colors.entity";
import { Colour } from "../colours/colour.entity";
import { BuyersSize } from "./buyers-sizes.entity";
import { BuyersDestinationRequest } from "./dto/byers-destination.request";

@Injectable()
export class buyersSizesMappingRepository extends Repository<BuyersSize> {

    constructor(@InjectRepository(BuyersSize) private buyersMappingRepo: Repository<BuyersSize>
    ) {
        super(buyersMappingRepo.target, buyersMappingRepo.manager, buyersMappingRepo.queryRunner);
    }


    async getAll(req?:BuyersDestinationRequest):Promise<any[]>{
        const query = this.createQueryBuilder('bs')
        .select(`b.buyer_name,b.buyer_id,s.sizes,s.size_id`)
        .leftJoin(Buyers,'b','b.buyer_id = bs.buyer_id')
        .leftJoin(Size,'s','s.size_id = bs.size_id')
        // .groupBy(`s.size_id`)
        if(req.buyerId !== undefined) {
            query.where(`b.buyer_id = '${req.buyerId}'`)
        }
        query.orderBy(`b.buyer_id`)
        return await query.getRawMany()
    }
}
