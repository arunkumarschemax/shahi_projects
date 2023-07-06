import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrdersEntity } from "../orders.entity";

@Injectable()
export class OrdersRepository extends Repository<OrdersEntity> {
    constructor(@InjectRepository(OrdersEntity) private orderRepository: Repository<OrdersEntity>
    ) {
        super(orderRepository.target, orderRepository.manager, orderRepository.queryRunner);
    }
}