import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FgItemBom } from "./fg-item-bom.entity";

@Injectable()
export class FGItemBomRepository extends Repository<FgItemBom> {

    constructor(@InjectRepository(FgItemBom) private fgItemBomRepo: Repository<FgItemBom>
    ) {
        super(fgItemBomRepo.target, fgItemBomRepo.manager, fgItemBomRepo.queryRunner);
    }

}