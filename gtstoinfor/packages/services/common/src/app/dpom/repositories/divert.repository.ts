import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DivertEntity } from "../entites/divert.entity";

@Injectable()
export class DivertRepository extends Repository<DivertEntity> {
    getFactoryReportData() {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(DivertEntity) private divertRepository: Repository<DivertEntity>
    ) {
        super(divertRepository.target, divertRepository.manager, divertRepository.queryRunner);
    }
}