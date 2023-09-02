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
export class buyerColorsMappingRepository extends Repository<BuyersColor> {

    constructor(@InjectRepository(BuyersColor) private buyersMappingRepo: Repository<BuyersColor>
    ) {
        super(buyersMappingRepo.target, buyersMappingRepo.manager, buyersMappingRepo.queryRunner);
    }

    async getAll(req?:BuyersDestinationRequest):Promise<any[]>{
        const query = this.createQueryBuilder('bc')
        .select(`b.buyer_name,b.buyer_id,c.colour,c.colour_id`)
        .leftJoin(Buyers,'b','b.buyer_id = bc.buyer_id')
        .leftJoin(Colour,'c','c.colour_id = bc.colour_id')
        // .groupBy(`c.colour_id`)
        if(req.buyerId !== undefined) {
            query.where(`b.buyer_id = '${req.buyerId}'`)
        }
        query.orderBy(`b.buyer_id`)
        return await query.getRawMany()
    }

}
