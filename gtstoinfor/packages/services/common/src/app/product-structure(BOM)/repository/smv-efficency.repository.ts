import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { SMVEfficiencyEntity } from "../smv-efficency.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { SMVFilterRequest } from "@project-management-system/shared-models";

@Injectable()
export class SMVEfficiencyRepository extends Repository<SMVEfficiencyEntity> {

    constructor(@InjectRepository(SMVEfficiencyEntity) private SmvEffRepo: Repository<SMVEfficiencyEntity>
    ) {
        super(SmvEffRepo.target, SmvEffRepo.manager, SmvEffRepo.queryRunner);
    }
    async getSMV(req: SMVFilterRequest ): Promise<any[]> {
        const query = this.createQueryBuilder('sm')
        .select(`*`).where('1=1'); 
      
        if (req.departmentId !== undefined) {
          query.andWhere(`department_id = :dptid`, { dptid: req.departmentId }); 
        }
        if (req.operationId !== undefined) {
            query.andWhere(`operation_id = :optid`, { optid: req.operationId }); 
          }
        let data:SMVEfficiencyEntity[] = await query.getRawMany();
        return data;
      }

   
}