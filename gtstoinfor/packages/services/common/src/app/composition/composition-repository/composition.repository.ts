import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppDataSource } from "../../app-datasource";
import { CompositionEnitty } from "../composition.entity";

@Injectable()
export class CompositionRepository extends Repository<CompositionEnitty> {
    constructor(@InjectRepository(CompositionEnitty) private Repository: Repository<CompositionEnitty>
    ) {
        super(Repository.target, Repository.manager, Repository.queryRunner);
    }

    async getOrdersData(): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`o.id, o.comsposition_code, o.composition_description, o.itemName, o.created_at`)
            .orderBy(` o.prod_plan_type_name`, 'ASC')
        return await query.getRawMany();
    }

 
}