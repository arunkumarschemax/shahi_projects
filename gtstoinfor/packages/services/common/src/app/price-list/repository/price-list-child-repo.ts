import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PriceListChildEntity } from "../entities/price-list-child-entity";

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
}