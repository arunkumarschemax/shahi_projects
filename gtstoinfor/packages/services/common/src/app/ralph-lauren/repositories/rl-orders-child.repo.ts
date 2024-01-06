import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RLOrderschildEntity } from "../entities/rl-orders-child.entity";

@Injectable()
export class RLOrdersChildRepository extends Repository<RLOrderschildEntity> {

    constructor(@InjectRepository(RLOrderschildEntity) private rlOrderschildRepository: Repository<RLOrderschildEntity>
    ) {
        super(rlOrderschildRepository.target, rlOrderschildRepository.manager, rlOrderschildRepository.queryRunner);
    }





}