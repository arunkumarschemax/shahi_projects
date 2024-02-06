import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EddieChildEntity } from "../entities/eddie-orders-child-entity";

@Injectable()
export class EddieOrdersChildRepository extends Repository<EddieChildEntity> {

    constructor(@InjectRepository(EddieChildEntity) private eddieOrdersChildRepository: Repository<EddieChildEntity>
    ) {
        super(eddieOrdersChildRepository.target, eddieOrdersChildRepository.manager, eddieOrdersChildRepository.queryRunner);
    }

}