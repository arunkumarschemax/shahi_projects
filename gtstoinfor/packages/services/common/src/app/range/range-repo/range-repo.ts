import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppDataSource } from "../../app-datasource";
import { RangeEnitty } from "../range-entity";

@Injectable()
export class RangeRepository extends Repository<RangeEnitty> {
    constructor(@InjectRepository(RangeEnitty) private Repository: Repository<RangeEnitty>
    ) {
        super(Repository.target, Repository.manager, Repository.queryRunner);
    }

    async getRangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.id, o.range_code, o.range_description, o.created_at`)
            .orderBy(` o.prod_plan_type_name`, 'ASC')
        return await query.getRawMany();
    }

 
}