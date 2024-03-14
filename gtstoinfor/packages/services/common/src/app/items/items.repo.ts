import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Items } from "./items.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ItemsRepository extends Repository<Items> {
    constructor(@InjectRepository(Items) private userRepository: Repository<Items>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
}