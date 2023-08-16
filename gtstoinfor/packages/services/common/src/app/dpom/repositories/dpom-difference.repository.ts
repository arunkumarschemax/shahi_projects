import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomDifferenceEntity } from "../entites/dpom-difference.entity";

@Injectable()
export class DpomDifferenceRepository extends Repository<DpomDifferenceEntity> {
    getFactoryReportData() {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(DpomDifferenceEntity) private dpomDifferenceRepository: Repository<DpomDifferenceEntity>
    ) {
        super(dpomDifferenceRepository.target, dpomDifferenceRepository.manager, dpomDifferenceRepository.queryRunner);
    }
}