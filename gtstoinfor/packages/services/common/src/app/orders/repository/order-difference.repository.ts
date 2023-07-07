import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersDifferenceEntity } from "../orders-difference-info.entity";

@Injectable()
export class OrderDifferenceRepository extends Repository<OrdersDifferenceEntity> {
    constructor(@InjectRepository(OrdersDifferenceEntity) private orderDiffRepository: Repository<OrdersDifferenceEntity>
    ) {
        super(orderDiffRepository.target, orderDiffRepository.manager, orderDiffRepository.queryRunner);
    }
}