import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CoTypes } from "./co-type.entity";

@Injectable()
export class CoTypeRepository extends Repository<CoTypes> {

    constructor(@InjectRepository(CoTypes) private CoTypes: Repository<CoTypes>
    ) {
        super(CoTypes.target, CoTypes.manager, CoTypes.queryRunner);
    }
}