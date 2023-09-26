import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PriceListEntity } from "../entities/pricelist.entity";
import { NewFilterDto } from "@project-management-system/shared-models";

@Injectable()
export class pricListRepository extends Repository<PriceListEntity> {
    constructor(@InjectRepository(PriceListEntity) private userRepository: Repository<PriceListEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async getStyle(): Promise<any[]> {
        const query = await this.createQueryBuilder('o')
            .select(`id,style`)
             .where(`style is not null`)
             .groupBy(`style`)
            .getRawMany();
        return query

    }

    async getPriceListData(req:NewFilterDto): Promise<any[]> {
        const query = await this.createQueryBuilder('o')
            .select(`season_code,YEAR , style,price,currency,destination,item,id,version_flag,updated_user,is_active,created_user,created_at`)
            if (req.style !== undefined) {
                query.andWhere(`style ='${req.style}'`)
            }
            if (req.destination !== undefined) {
                query.andWhere(`destination ='${req.destination}'`)
            }
            if (req.year !== undefined) {
                query.andWhere(`YEAR ='${req.year}'`)
            }
            if (req.currency !== undefined) {
                query.andWhere(`currency ='${req.currency}'`)
            }
            if (req.seasonCode !== undefined) {
                query.andWhere(`season_code ='${req.seasonCode}'`)
            }
            return await query.getRawMany();

    }
    
    async getDestination(): Promise<any[]> {
        const query = await this.createQueryBuilder('o')
            .select(`id,destination`)
             .where(`destination is not null`)
             .groupBy(`destination`)
            .getRawMany();
        return query

    }
    async getYear(): Promise<any[]> {
        const query = await this.createQueryBuilder('o')
            .select(`id,YEAR`)
             .where(`YEAR is not null`)
             .groupBy(`YEAR`)
            .getRawMany();
        return query

    }
    async getCurrency(): Promise<any[]> {
        const query = await this.createQueryBuilder('o')
            .select(`id,currency`)
             .where(`currency is not null`)
             .groupBy(`currency`)
            .getRawMany();
        return query

    }
    async getAllPriceListSeasonCode(): Promise<any[]> {
        const query = await this.createQueryBuilder('o')
            .select(`id,season_code`)
             .where(`season_code is not null`)
             .groupBy(`season_code`)
            .getRawMany();
        return query

    }
}