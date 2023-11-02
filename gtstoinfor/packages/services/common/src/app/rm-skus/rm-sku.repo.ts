import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RmSkus } from "./rm-sku.entity";

@Injectable()
export class RmSKusRepository extends Repository<RmSkus> {

    constructor(@InjectRepository(RmSkus) private rmSkus: Repository<RmSkus>
    ) {
        super(rmSkus.target, rmSkus.manager, rmSkus.queryRunner);
    }
}