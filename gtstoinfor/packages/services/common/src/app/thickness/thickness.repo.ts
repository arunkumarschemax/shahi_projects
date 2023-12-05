import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Thickness } from "./thickness.entity";

@Injectable()
export class ThicknessRepository extends Repository<Thickness> {

    constructor(@InjectRepository(Thickness) private Thickness: Repository<Thickness>
    ) {
        super(Thickness.target, Thickness.manager, Thickness.queryRunner);
    }
}