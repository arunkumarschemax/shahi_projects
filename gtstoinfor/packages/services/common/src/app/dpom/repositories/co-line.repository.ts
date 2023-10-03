import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { COLineEntity } from "../entites/co-line.entity";

@Injectable()
export class COLineRepository extends Repository<COLineEntity> {
    getFactoryReportData() {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(COLineEntity) private coLineRepository: Repository<COLineEntity>
    ) {
        super(coLineRepository.target, coLineRepository.manager, coLineRepository.queryRunner);
    }

}