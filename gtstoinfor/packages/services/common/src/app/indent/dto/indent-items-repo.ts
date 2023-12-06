import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { IndentItemsEntity } from "../indent-items.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class IndentItemsRepository extends Repository<IndentItemsEntity> {

    constructor(@InjectRepository(IndentItemsEntity) private IndentItemsEntity: Repository<IndentItemsEntity>
    ) {
        super(IndentItemsEntity.target, IndentItemsEntity.manager, IndentItemsEntity.queryRunner);
    }
}