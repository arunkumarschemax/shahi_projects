import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersChildEntity } from "../orders-child.entity";

@Injectable()
export class OrdersChildRepository extends Repository<OrdersChildEntity> {
    constructor(@InjectRepository(OrdersChildEntity) private orderChildRepository: Repository<OrdersChildEntity>
    ) {
        super(orderChildRepository.target, orderChildRepository.manager, orderChildRepository.queryRunner);
    }
}