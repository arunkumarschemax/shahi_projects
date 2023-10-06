import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BomTrimEntity } from "../bom-trim.entity";

@Injectable()
export class BomTrimRepository extends Repository<BomTrimEntity> {

    constructor(@InjectRepository(BomTrimEntity) private TrimRepo: Repository<BomTrimEntity>
    ) {
        super(TrimRepo.target, TrimRepo.manager, TrimRepo.queryRunner);
    }
   

    async getAllCount(): Promise<any> {
        const query =  this.createQueryBuilder('bom_trim')
            .select(`MAX(id) as id`)
            .orderBy(` created_at`, 'DESC')
        return await query.getRawOne()

    }

}