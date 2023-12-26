import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CentricEntity } from "../entity/centric.entity";
import { PoOrderFilter } from "@project-management-system/shared-models";


@Injectable()
export class CentricRepository extends Repository<CentricEntity> {

    constructor(@InjectRepository(CentricEntity) private CentricRepo: Repository<CentricEntity>
    ) {
        super(CentricRepo.target, CentricRepo.manager, CentricRepo.queryRunner);
    }

    async getorderData(req?:PoOrderFilter): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`*`)
            if(req.poNumber !== undefined){
                query.andWhere(`o.po_number ='${req.poNumber}'`) 
            }
            if(req.externalRefNo != undefined){
                query.andWhere(` o.buyer = "${req.externalRefNo}"`)
            }
        return await query.getRawMany()
    }

    
    async getDistinctPoNumbers(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`DISTINCT po_number`)
        
        return await query.getRawMany()
    }


    


}