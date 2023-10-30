import { EntityRepository, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { groupBy } from "rxjs";
import { FeatureEntity } from "../entities/feature.entity";
import { FeatureOptionEntity } from "../entities/feature-option-entity";
import { FeatureFilterRequest } from "@project-management-system/shared-models";



@Injectable()
export class FeatureOpitionRepository extends Repository<FeatureOptionEntity> {
    constructor(@InjectRepository(FeatureOptionEntity) private repo: Repository<FeatureOptionEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getAllFeatureOptionData(req: FeatureFilterRequest): Promise<any> {
        const query = this.createQueryBuilder('feo')
          .select([
            'feo.feature_option_id','feo.feature_code','feo.option_group','feo.option_id','fe.feature_name','fe.option_group AS optiongroupForFeature',
          ])
          .leftJoin(FeatureEntity, 'fe', 'fe.feature_id = feo.feature_id')
          .where('1=1');
      
        if (req.featureCode !== undefined) {
          query.andWhere(`feo.feature_code = :featureCode`, { featureCode: req.featureCode });
        }
        if (req.featureName !== undefined) {
          query.andWhere(`fe.feature_name = :featureName`, { featureName: req.featureName });
        }
        if (req.optionGroup !== undefined) {
          query.andWhere(`feo.option_group = :optionGroup`, { optionGroup: req.optionGroup });
        }
      
        return await query.getRawMany();
      }
      
    async getFeatureCode(): Promise<any[]> {
        const query = this.createQueryBuilder('fe')
            .select(` fe.feature_code,fe.feature_option_id`)
            .groupBy(`fe.feature_code`)
        return await query.getRawMany();
    }
   
    async getOptionGropup(): Promise<any[]> {
        const query = this.createQueryBuilder('fe')
            .select(` fe.option_group,fe.feature_option_id`)
            .groupBy(`fe.option_group`)
        return await query.getRawMany();
    }
}