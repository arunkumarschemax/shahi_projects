import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { SMVEfficiencyEntity } from "../smv-efficency.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { SMVFilterRequest } from "@project-management-system/shared-models";
import { Departments } from "../../departments/departments.entity";
import { Operations } from "../../operations/operation.entity";

@Injectable()
export class SMVEfficiencyRepository extends Repository<SMVEfficiencyEntity> {

    constructor(@InjectRepository(SMVEfficiencyEntity) private SmvEffRepo: Repository<SMVEfficiencyEntity>
    ) {
        super(SmvEffRepo.target, SmvEffRepo.manager, SmvEffRepo.queryRunner);
    }
  

    async getSMV(req: SMVFilterRequest): Promise<any[]> {
      const query = this.createQueryBuilder('sm')
          .select('op.operation_name,d.dept_name, smv_efficiency_id,capacity_type,valid_from_date,valid_to_date,revision_no,work_center,operation_description,planing_area,run_time,price_time_qty,setup_time,external_setup,fixed_time,plnno_machine,plnno_workers,plnno_setup,plnno_op_mtd,leadtm_offset,p_days,options_percent,scrap_pct,setup_scrap,document_id,tool_no,subcontr_ctrl,finite,qty_per_hour,crit_resource,add_mtrl_offset,shipping_buffer')
          .leftJoin(Departments, 'd','d.dept_id = sm.department_id')
          .leftJoin(Operations , 'op','op.operation_id = sm.operation_id')
          .where('1=1');
  
      if (req.departmentId !== undefined) {
          query.andWhere(`d.dept_name = :dptid`, { dptid: req.departmentId });
      }
      if (req.operationId !== undefined) {
          query.andWhere(`op.operation_name = :optid`, { optid: req.operationId });
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