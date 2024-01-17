import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CentricChildEntity } from "../entity/centric-child.entity";

@Injectable()
export class CentricOrdersChildRepository extends Repository<CentricChildEntity> {

    constructor(@InjectRepository(CentricChildEntity) private centricOrderschildRepository: Repository<CentricChildEntity>
    ) {
        super(centricOrderschildRepository.target, centricOrderschildRepository.manager, centricOrderschildRepository.queryRunner);
    }





}