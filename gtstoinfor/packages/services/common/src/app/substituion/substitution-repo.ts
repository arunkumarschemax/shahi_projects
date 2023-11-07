import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Substitution } from "./substituion.entity";

@Injectable()
export class SubstitutionRepository extends Repository<Substitution> {

    constructor(@InjectRepository(Substitution) private substitutionRepo: Repository<Substitution>
    ) {
        super(substitutionRepo.target, substitutionRepo.manager, substitutionRepo.queryRunner);
    }

}