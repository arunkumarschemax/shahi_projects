import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Style } from "../style/dto/style-entity";
import { BuyersDestionations } from "./buyers-destination.entity";
import { Destination } from "../destination/destination.entity";
import { Size } from "../sizes/sizes-entity";
import { Buyers } from "../buyers/buyers.entity";

@Injectable()
export class buyersDestionationMappingRepository extends Repository<BuyersDestionations> {

    constructor(@InjectRepository(BuyersDestionations) private buyersMappingRepo: Repository<BuyersDestionations>
    ) {
        super(buyersMappingRepo.target, buyersMappingRepo.manager, buyersMappingRepo.queryRunner);
    }

    async getSizesDropDown():Promise<any[]>{
        const query = this.createQueryBuilder('bd')
        .select(`s.size_id,s.sizes`)
        .leftJoin(Size,`s`,`bd.size_id = s.size_id`)
        .groupBy(`s.size`)
        .orderBy(`s.size`)
        return await query.getRawMany()
    }

    // async getColourDropDown():Promise<any[]>{
    //     const query = this.createQueryBuilder('bd')
    //     .select(`gc.colour_id,gc.colour`)
    //     .leftJoin(Colour,`gc`,`bd.colour_id = gc.colour_id`)
    //     .groupBy(`gc.colour`)
    //     .orderBy(`gc.colour`)
    //     return await query.getRawMany()
    // }

    async getDestinationDropDown():Promise<any[]>{
        const query = this.createQueryBuilder('bd')
        .select(`d.destination_id,d.destination`)
        .leftJoin(Destination,`d`,`bd.destination_id = d.destination_id`)
        .groupBy(`d.destination`)
        .orderBy(`d.destination`)
        return await query.getRawMany()
    }

    async getAll():Promise<any[]>{
        const query = this.createQueryBuilder('bd')
        .select(`d.destination_id,d.destination,s.sizes,s.sizeId`)
        .leftJoin(Destination,`d`,`bd.destination_id = d.destination_id`)
        .leftJoin(Buyers,'b','b.buyer_id = d.buyer_id')
        .leftJoin(Size,'s','s.buyer_id = b.buyer_id')
        .groupBy(`b.buyer_id`)
        .orderBy(`b.buyer_id`)
        return await query.getRawMany()
    }
}