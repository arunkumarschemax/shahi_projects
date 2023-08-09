import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Style } from "../style/dto/style-entity";
import { ComponentMappingEntity } from "./component-mapping.entity";
import { GarmentCategory } from "../garment-category/garment-category.entity";
import { Garments } from "../garments/garments.entity";

@Injectable()
export class ComponentMappingRepository extends Repository<ComponentMappingEntity> {

    constructor(@InjectRepository(ComponentMappingEntity) private ComponentMappingRepo: Repository<ComponentMappingEntity>
    ) {
        super(ComponentMappingRepo.target, ComponentMappingRepo.manager, ComponentMappingRepo.queryRunner);
    }

    async getStylesDropDown():Promise<any[]>{
        const query = this.createQueryBuilder('cm')
        .select(`st.style_id,st.style,st.description`)
        .leftJoin(Style,`st`,`cm.style_id = st.style_id`)
        .groupBy(`st.style`)
        .orderBy(`st.style`)
        return await query.getRawMany()
    }

    async getGarmentCategoryDropDown():Promise<any[]>{
        const query = this.createQueryBuilder('cm')
        .select(`gc.garment_category_id,gc.garment_category`)
        .leftJoin(GarmentCategory,`gc`,`cm.garment_category_id = gc.garment_category_id`)
        .groupBy(`gc.garment_category_id`)
        .orderBy(`gc.garment_category_id`)
        return await query.getRawMany()
    }

    async getGarmnetDropDown():Promise<any[]>{
        const query = this.createQueryBuilder('cm')
        .select(`g.garment_id,g.garment_name`)
        .leftJoin(Garments,`g`,`cm.style_id = g.garment_id`)
        .groupBy(`g.garment_name`)
        .orderBy(`g.garment_name`)
        return await query.getRawMany()
    }


}