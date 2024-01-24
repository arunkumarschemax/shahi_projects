import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StyleEntity } from "../entittes/style-entity";


@Injectable()
export class StyleRepo extends Repository<StyleEntity> {
    constructor(@InjectRepository(StyleEntity) private styleRepo: Repository<StyleEntity>
    ) {
        super(styleRepo.target, styleRepo.manager, styleRepo.queryRunner);
    }

    async getStyelsData(): Promise<any[]> {
        const queryBuilder = this.createQueryBuilder('s')
        .select(`id,style, style_name AS styleName,season,exp_no AS expNo,msc,factoryLo,status,null as bomData`)
        return await queryBuilder.getRawMany()
    }
}