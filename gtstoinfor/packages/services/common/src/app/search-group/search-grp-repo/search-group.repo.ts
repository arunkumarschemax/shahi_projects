import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppDataSource } from "../../app-datasource";
import { SearchGroupEnitty } from "../search-group.entity";

@Injectable()
export class SearchGroupRepository extends Repository<SearchGroupEnitty> {
    constructor(@InjectRepository(SearchGroupEnitty) private Repository: Repository<SearchGroupEnitty>
    ) {
        super(Repository.target, Repository.manager, Repository.queryRunner);
    }

    async getRangeData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.id, o.search_grp_code, o.search_grp_name, o.created_at`)
            .orderBy(` o.prod_plan_type_name`, 'ASC')
        return await query.getRawMany();
    }

 
}