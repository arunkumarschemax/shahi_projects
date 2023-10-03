import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoLine } from "../entities/co-line.entity";

@Injectable()
export class CoLineRepository extends Repository<CoLine> {
    constructor(@InjectRepository(CoLine) private colineRepository: Repository<CoLine>
    ) {
        super(colineRepository.target, colineRepository.manager, colineRepository.queryRunner);
    }
}