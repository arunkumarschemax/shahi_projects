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
  

    async getSMV(req: SMVFilterRequest): Promise<any[]> {
      const query = this.createQueryBuilder('sm')
          .select('*')
          .where('1=1');
  
      if (req.departmentId !== undefined) {
          query.andWhere(`department_id = :dptid`, { dptid: req.departmentId });
      }
      if (req.operationId !== undefined) {
          query.andWhere(`operation_id = :optid`, { optid: req.operationId });
      }
  
      if (req.optionsPercent !== undefined) {
          if (req.optionsPercent === '0') {
              query.andHaving('options_percent < 0');
          } else if (req.optionsPercent === '1-20') {
              query.andHaving('options_percent between 1 and 20');
          } else if (req.optionsPercent === '21-40') {
              query.andHaving('options_percent between 21 and 40');
          } else if (req.optionsPercent === '41-60') {
              query.andHaving('options_percent between 41 and 60');
          } else if (req.optionsPercent === '61-80') {
              query.andHaving('options_percent between 61 and 80');
          } else if (req.optionsPercent === '81-100') {
              query.andHaving('options_percent between 81 and 100');
          }
      }
      if (req.optionsPercent !== undefined) {
          query.addOrderBy('options_percent', 'ASC');
      }
  
      let data: SMVEfficiencyEntity[] = await query.getRawMany();
      return data;
  }
  
   
}