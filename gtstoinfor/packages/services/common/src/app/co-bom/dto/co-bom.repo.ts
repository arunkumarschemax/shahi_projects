import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoBom } from "../co-bom.entity";
import { FgItemBom } from "../../substituion/fg-item-bom.entity";


@Injectable()
export class CoBomRepository extends Repository<CoBom>{
    constructor(@InjectRepository(CoBom) private CoRepo: Repository<CoBom>
    ) {
        super(CoRepo.target, CoRepo.manager, CoRepo.queryRunner);
    }


    async getBomagainstitem():Promise<any>{
        const query = await this.createQueryBuilder('i')
        .select('*')
        .leftJoin(FgItemBom,'Fg','Fg.fgItemBomId= i.fgItemBomId')

        return query.getRawMany
    }
}