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

    async getSampleCode(): Promise<any[]> {
        const query = await this.createQueryBuilder('o')
            .select(`id,sample_code`)
             .where(`sample_code is not null`)
             .groupBy(`sample_code`)
            .getRawMany();
        return query

    }

    async getPriceListData(req:NewFilterDto): Promise<any[]> {
        const query = await this.createQueryBuilder('o')
            .select(`season as seasonCode,year , sample_code as sampleCode,fob_local_currency as fobLocalCurrency,currency,business,item,id,version_flag,updated_user,is_active,created_user,created_at`)
           .orderBy(`sample_code`)
            if (req.sampleCode !== undefined) {
                query.andWhere(`sample_code ='${req.sampleCode}'`)
            }
            if (req.business !== undefined) {
                query.andWhere(`business ='${req.business}'`)
            }
            if (req.year !== undefined) {
                query.andWhere(`year ='${req.year}'`)
            }
            if (req.currency !== undefined) {
                query.andWhere(`currency ='${req.currency}'`)
            }
            if (req.seasonCode !== undefined) {
                query.andWhere(`season ='${req.seasonCode}'`)
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

    async getVersion(sampleCode: string,seasonCode:string): Promise<any[]> {
        const query = this.createQueryBuilder('o')
            .select(`id,season,sample_code,version`)
            .where(` order_no = '${sampleCode}' and size_code='${seasonCode}'`)
            .orderBy(` version`, 'DESC')
        return await query.getRawMany();
    }
}