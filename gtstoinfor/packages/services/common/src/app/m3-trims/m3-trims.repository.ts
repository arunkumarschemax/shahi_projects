import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { M3TrimsEntity } from "./m3-trims.entity";




@Injectable()
export class M3TrimsRepo extends Repository<M3TrimsEntity> {

    constructor(@InjectRepository(M3TrimsEntity) private M3TrimsEntity: Repository<M3TrimsEntity>
    ) {
        super(M3TrimsEntity.target, M3TrimsEntity.manager, M3TrimsEntity.queryRunner);
    }

    async getM3TrimsData (){
        const query = this.createQueryBuilder(`m3`)
        .select (`m3.m3_trims_Id,m3.trim_type,m3.trim_code`)
        const data = await query.getRawMany()
        return data 
    }
    
}