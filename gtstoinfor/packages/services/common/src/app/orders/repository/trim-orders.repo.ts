import { Repository } from "typeorm";
import { TrimOrdersEntity } from "../entities/trim-orders.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class TrimOrdersRepository extends Repository<TrimOrdersEntity> {
    constructor(@InjectRepository(TrimOrdersEntity) private trimOrderRepository: Repository<TrimOrdersEntity>
    ) {
        super(trimOrderRepository.target, trimOrderRepository.manager, trimOrderRepository.queryRunner);
    }
}