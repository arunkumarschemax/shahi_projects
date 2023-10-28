import { EntityRepository, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { groupBy } from "rxjs";
import { FeatureEntity } from "../entities/feature.entity";
import { FeatureOptionEntity } from "../entities/feature-option-entity";



@Injectable()
export class FeatureOpitionRepository extends Repository<FeatureOptionEntity> {
    constructor(@InjectRepository(FeatureOptionEntity) private repo: Repository<FeatureOptionEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

  
    async getAllFeatureOptionData(): Promise<any> {
        const query = this.createQueryBuilder('feo')
            .select(`feo.feature_option_id  , feo.feature_code ,feo.option_group,feo.option_id,fe.feature_name,fe.option_group AS optiongroupForFeature`)
            .leftJoin(FeatureEntity,'fe',` fe.feature_id = feo.feature_id `)
        return await query.getRawMany();
    }
}