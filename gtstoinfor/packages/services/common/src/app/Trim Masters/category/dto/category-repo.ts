import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./category-entity";
@Injectable()
export class OrdersRepository extends Repository<CategoryEntity> {
    constructor(@InjectRepository(CategoryEntity) private categoryRepo: Repository<CategoryEntity>
    ) {
        super(categoryRepo.target, categoryRepo.manager, categoryRepo.queryRunner);
    }
}