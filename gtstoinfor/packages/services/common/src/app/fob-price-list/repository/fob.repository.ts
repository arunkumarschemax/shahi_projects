import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FobEntity } from "../fob.entity";
import { FobFilterRequest } from "@project-management-system/shared-models";

@Injectable()
export class FobRepository extends Repository<FobEntity> {
    constructor(@InjectRepository(FobEntity) private userRepository: Repository<FobEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async getFobPlanningSeasonCode(): Promise<any[]> {
        const query = this.createQueryBuilder('fob')
            .select(` fob.planning_season_code,fob.id`)
            .where(`fob.planning_season_code IS NOT NULL`)
            .groupBy(`fob.planning_season_code`)
        return await query.getRawMany();
    }

    async getFobPlanningSeasonYear(): Promise<any[]> {
        const query = this.createQueryBuilder('fob')
            .select(` fob.planning_season_year,fob.id`)
            .where(`fob.planning_season_year IS NOT NULL`)
            .groupBy(`fob.planning_season_year`)
        return await query.getRawMany();
    }

    async getFobStyleNumber(): Promise<any[]> {
        const query = this.createQueryBuilder('fob')
            .select(` fob.style_number,fob.id`)
            .where(`fob.style_number IS NOT NULL`)
            .groupBy(`fob.style_number`)
        return await query.getRawMany();
    }

    async getFobColorCode(): Promise<any[]> {
        const query = this.createQueryBuilder('fob')
            .select(` fob.color_code,fob.id`)
            .where(`fob.color_code IS NOT NULL`)
            .groupBy(`fob.color_code`)
        return await query.getRawMany();
    }

    async getFobSizeDescription(): Promise<any[]> {
        const query = this.createQueryBuilder('fob')
            .select(` fob.size_description,fob.id`)
            .where(`fob.size_description IS NOT NULL`)
            .groupBy(`fob.size_description`)
        return await query.getRawMany();
    }

    async getFobPricelist(req: FobFilterRequest): Promise<any[]> {
        const query = this.createQueryBuilder('fob')
            .select(` fob.id,fob.created_at,fob.version_flag,fob.is_active AS isActive,fob.planning_season_code,
            fob.planning_season_year,fob.style_number,fob.color_code,fob.size_description,fob.shahi_confirmed_gross_price,
            fob.shahi_confirmed_gross_price_currency_code`)
        if (req.planningSeasonCode !== undefined) {
            query.andWhere(`fob.planning_season_code ='${req.planningSeasonCode}'`)
        }
        if (req.planningSeasonYear !== undefined) {
            query.andWhere(`fob.planning_season_year ='${req.planningSeasonYear}'`)
        }
        if (req.styleNumber !== undefined) {
            query.andWhere(`fob.style_number ='${req.styleNumber}'`)
        }
        if (req.colorCode !== undefined) {
            query.andWhere(`fob.color_code ='${req.colorCode}'`)
        }
        if (req.sizeDescription !== undefined) {
            query.andWhere(`fob.size_description ='${req.sizeDescription}'`)
        }
        return await query.getRawMany();
    }

}