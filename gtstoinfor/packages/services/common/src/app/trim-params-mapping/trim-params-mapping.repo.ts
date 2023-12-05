import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TrimParamsMapping } from "./trim-params-mapping.entity";

@Injectable()
export class TrimParamsMappingRepository extends Repository<TrimParamsMapping> {

    constructor(@InjectRepository(TrimParamsMapping) private trimMapping: Repository<TrimParamsMapping>
    ) {
        super(trimMapping.target, trimMapping.manager, trimMapping.queryRunner);
    }
}