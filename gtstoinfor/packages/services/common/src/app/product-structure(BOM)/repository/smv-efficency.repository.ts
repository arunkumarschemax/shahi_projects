import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { SMVEfficiencyEntity } from "../smv-efficency.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SMVEfficiencyRepository extends Repository<SMVEfficiencyEntity> {

    constructor(@InjectRepository(SMVEfficiencyEntity) private SmvEffRepo: Repository<SMVEfficiencyEntity>
    ) {
        super(SmvEffRepo.target, SmvEffRepo.manager, SmvEffRepo.queryRunner);
    }
    async getSMV(req: any ): Promise<any[]> {
        const query = this.createQueryBuilder('sm')
        .select(`*`).where('1=1'); 
      
        // if (req.fgItemCode !== undefined) {
        //   query.andWhere(`fg_item_code = :fgCode`, { fgCode: req.fgItemCode }); 
        // }
        // if (req.rmItemCode !== undefined) {
        //     query.andWhere(`rm_item_code = :RmCode`, { RmCode: req.rmItemCode }); 
        //   }
        let data:SMVEfficiencyEntity[] = await query.getRawMany();
        return data;
      }

   
}