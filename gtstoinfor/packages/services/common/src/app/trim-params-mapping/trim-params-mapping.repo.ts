import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TrimParamsMapping } from "./trim-params-mapping.entity";
import { trimEntity } from "../Trim Masters/trim/trim-entity";

@Injectable()
export class TrimParamsMappingRepository extends Repository<TrimParamsMapping> {

    constructor(@InjectRepository(TrimParamsMapping) private trimMapping: Repository<TrimParamsMapping>
    ) {
        super(trimMapping.target, trimMapping.manager, trimMapping.queryRunner);
    }
    async getAll(): Promise<any> {
        const query = this.createQueryBuilder('tpm')
            .select(`tpm.trim_type as trimType,tpm.is_active as isActive,tpm.trim_mapping_id,tpm.trim_id as trimCategoryId,tpm.structure,tpm.category,tpm.content,tpm.type,tpm.finish,tpm.hole,tpm.quality,tpm.variety,tpm.uom,tpm.thickness, tpm.color,tpm.logo,tpm.part,tpm.shape,tpm.size,tpm.parts,tpm.ply,tpm.buyer,tpm.line,tpm.length,tpm.slider,tc.trim_category as trimCategory `)
            .leftJoin(trimEntity,'tc','tc.trim_id = tpm.trim_id')
         .orderBy(` tpm.trim_type`, 'DESC')
        return await query.getRawMany();
    };
}