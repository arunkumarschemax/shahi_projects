import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomChildEntity } from "../entites/dpom-child.entity";

@Injectable()
export class DpomChildRepository extends Repository<DpomChildEntity> {
    getFactoryReportData() {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(DpomChildEntity) private dpomChildRepository: Repository<DpomChildEntity>
    ) {
        super(dpomChildRepository.target, dpomChildRepository.manager, dpomChildRepository.queryRunner);
    }

    // async getVersion(productionPlanId: string): Promise<any[]> {
    //     const query = this.createQueryBuilder('oc')
    //         .select(`id,production_plan_id, version`)
    //         .where(` production_plan_id = ${productionPlanId}`)
    //         .orderBy(` version`, 'DESC')
    //     return await query.getRawMany();
    // }
}