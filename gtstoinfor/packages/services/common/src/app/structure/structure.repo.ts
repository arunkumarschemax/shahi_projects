import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Structure } from "./structure.entity";

@Injectable()
export class StructureRepository extends Repository<Structure> {

    constructor(@InjectRepository(Structure) private Structure: Repository<Structure>
    ) {
        super(Structure.target, Structure.manager, Structure.queryRunner);
    }
}