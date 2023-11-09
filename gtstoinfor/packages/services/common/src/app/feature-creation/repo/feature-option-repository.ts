import { EntityRepository, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { groupBy } from "rxjs";
import { FeatureEntity } from "../entities/feature.entity";
import { FeatureOptionEntity } from "../entities/feature-option-entity";
import { FeatureFilterRequest } from "@project-management-system/shared-models";
import { Colour } from "../../colours/colour.entity";
import { Destination } from "../../destination/destination.entity";
import { Size } from "../../sizes/sizes-entity";



@Injectable()
export class FeatureOpitionRepository extends Repository<FeatureOptionEntity> {
    constructor(@InjectRepository(FeatureOptionEntity) private repo: Repository<FeatureOptionEntity>
    ) {
        super(repo.target, repo.manager, repo.queryRunner);
    }

    async getAllFeatureOptionData(req: FeatureFilterRequest): Promise<any> {
        const query = this.createQueryBuilder('feo')
          .select([
            `feo.feature_option_id, feo.feature_code,feo.option_group,feo.option_id, fe.feature_name, fe.option_group AS optiongroupForFeature, 
            CASE 
                WHEN feo.option_group = 'COLOR' THEN c.colour
                WHEN feo.option_group = 'DESTINATION' THEN d.destination_Code
                WHEN feo.option_group = 'SIZE' THEN s.sizes
            END AS optionValue`
          ])
          .leftJoin(FeatureEntity, 'fe', 'fe.feature_id = feo.feature_id')
          .leftJoin(Colour , 'c','c.colour_id = feo.option_id')
          .leftJoin(Destination , 'd','d.destination_id = feo.option_id')
          .leftJoin(Size,'s','s.size_id = feo.option_id')
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