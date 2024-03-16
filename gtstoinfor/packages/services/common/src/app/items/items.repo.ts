import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemEntity } from "../po-bom/entittes/item-entity";

@Injectable()
export class ItemsRepository extends Repository<ItemEntity> {
    constructor(@InjectRepository(ItemEntity) private userRepository: Repository<ItemEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
}