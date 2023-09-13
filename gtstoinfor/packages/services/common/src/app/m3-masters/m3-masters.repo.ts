import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { M3MastersEntity } from "./m3-masters.entity";

@Injectable()
export class M3MastersRepository extends Repository<M3MastersEntity> {

    constructor(@InjectRepository(M3MastersEntity) private m3MastersEntity: Repository<M3MastersEntity>
    ) {
        super(m3MastersEntity.target, m3MastersEntity.manager, m3MastersEntity.queryRunner);
    }
}