import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CoLine } from "./co-line.entity";
import { styleOrderReq } from "@project-management-system/shared-models";

@Injectable()
export class CoLineRepository extends Repository<CoLine> {

    constructor(@InjectRepository(CoLine) private CoLineRepo: Repository<CoLine>
    ) {
        super(CoLineRepo.target, CoLineRepo.manager, CoLineRepo.queryRunner);
    }
async getAllCoLines(req: styleOrderReq):Promise<any>{
        console.log(req,'222222222');
        
        const query = await this.createQueryBuilder('co')
        .select(`*`)
        .where(`co.co_id =${req.coId}`)
       
        return query.getRawMany()
    }

}