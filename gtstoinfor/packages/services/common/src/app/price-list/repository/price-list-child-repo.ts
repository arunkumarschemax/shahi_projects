import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PriceListChildEntity } from "../entities/price-list-child-entity";
import { HistoryRequest, NewFilterDto } from "@project-management-system/shared-models";

@Injectable()
export class PriceListChildRepository extends Repository<PriceListChildEntity> {
    constructor(@InjectRepository(PriceListChildEntity)
    private priceListChildRepository: Repository<PriceListChildEntity>
        // @InjectConnection() private readonly connection: Connection
    ) {
        super(priceListChildRepository.target, priceListChildRepository.manager, priceListChildRepository.queryRunner);
    }

    async getVersion(sampleCode: string,seasonCode:string,year:string): Promise<any[]> {
        const query = this.createQueryBuilder('oc')
            .select(`id,sample_code,season,year,version`)
            .where(` sample_code = '${sampleCode}' and season='${seasonCode}' and year='${year}'`)
            .orderBy(` version`, 'DESC')
        return await query.getRawMany();
    }

    async getPriceHistory(req?: HistoryRequest): Promise<any[]> {
        const query = this.createQueryBuilder(`p1`)
            .select(`p1.item, p1.sample_code, p1.business, p1.year, p1.season, p1.currency, REPLACE(p1.fob_local_currency, ',', '') AS current_price,
            REPLACE(p2.fob_local_currency, ',', '') AS previous_price,
            (CAST(REPLACE(p1.fob_local_currency, ',', '') AS DECIMAL(10, 2)) - CAST(REPLACE(p2.fob_local_currency, ',', '') AS DECIMAL(10, 2))) AS price_variance,
            p1.created_at AS current_created_at,
            p2.created_at AS previous_created_at`)
            .leftJoin(PriceListChildEntity,'p2','p1.sample_code = p2.sample_code AND p1.business = p2.business AND p1.created_at > p2.created_at')
            .groupBy(`p1.sample_code, p1.business`)
            .orderBy(`p1.sample_code, p1.business`)
            .addOrderBy(`p1.created_at`,`DESC`)
            if (req) {
                if (req.sampleCode !== undefined) {
                    query.andWhere(`p1.sample_code ='${req.sampleCode}'`)
                }
                if (req.business !== undefined) {
                    query.andWhere(`p1.business ='${req.business}'`)
                }
                if (req.year !== undefined) {
                    query.andWhere(`p1.year ='${req.year}'`)
                }
                if (req.currency !== undefined) {
                    query.andWhere(`p1.currency ='${req.currency}'`)
                }
                if (req.seasonCode !== undefined) {
                    query.andWhere(`p1.season ='${req.seasonCode}'`)
                }
            }

        return await query.getRawMany();
    }

    async getBusiness(): Promise<any[]> {
        const query = await this.createQueryBuilder('o')
            .select(`id,business`)
             .where(`business is not null`)
             .groupBy(`business`)
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
            .select(`id,season`)
             .where(`season is not null`)
             .groupBy(`season`)
            .getRawMany();
        return query

    }

    async getSampleCode(): Promise<any[]> {
        const query = await this.createQueryBuilder('o')
            .select(`id,sample_code`)
             .where(`sample_code is not null`)
             .groupBy(`sample_code`)
            .getRawMany();
        return query

    }
}