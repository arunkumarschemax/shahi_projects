import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RLOrdersEntity } from "../entities/rl-orders.entity";

@Injectable()
export class RLOrdersRepository extends Repository<RLOrdersEntity> {

    constructor(@InjectRepository(RLOrdersEntity) private rlOrdersRepository: Repository<RLOrdersEntity>
    ) {
        super(rlOrdersRepository.target, rlOrdersRepository.manager, rlOrdersRepository.queryRunner);
    }

    async getPdfFileInfo(): Promise<any[]> {
        const query = this.createQueryBuilder('')
            .select(`*`)
        return await query.getRawMany()
    }

}