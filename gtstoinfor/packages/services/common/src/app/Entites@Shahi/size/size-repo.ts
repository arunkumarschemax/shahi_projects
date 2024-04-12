import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SizeEntity } from "./size-entity";

@Injectable()
export class SizeRepository extends Repository<SizeEntity> {
    constructor(@InjectRepository(SizeEntity) private userRepository: Repository<SizeEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
}