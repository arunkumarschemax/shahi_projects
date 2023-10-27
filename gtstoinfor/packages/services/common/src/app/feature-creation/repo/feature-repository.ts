import { EntityRepository, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { groupBy } from "rxjs";
import { FeatureEntity } from "../entities/feature.entity";



@Injectable()
export class FeatureRepository extends Repository<FeatureEntity> {
    constructor(@InjectRepository(FeatureEntity) private repo: Repository<FeatureEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getFeatureId(): Promise<any> {
        const query = this.createQueryBuilder()
            .select(` MAX(feature_id) as featureId`)
        return await query.getRawOne();
    }
}