import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PoBomEntity } from "../entittes/po-bom.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomEntity } from "../../dpom/entites/dpom.entity";
import { BomEntity } from "../entittes/bom-entity";
import { BomProposalDataModel, BomProposalReq } from "@project-management-system/shared-models";
import { ZFactorsEntity } from "../entittes/z-factors.entity";

@Injectable()
export class ZFactorsRepo extends Repository<ZFactorsEntity> {
    constructor(@InjectRepository(ZFactorsEntity) private zFactorsRepo: Repository<ZFactorsEntity>
    ) {
        super(zFactorsRepo.target, zFactorsRepo.manager, zFactorsRepo.queryRunner);
    }

    async getZfactorsData(styleId, itemId) {
        const query = await this.createQueryBuilder('z')
        .select('z.z_factor as zFactor,z_factor_value as zFactorValue,action,actual_im as actualIm,replaced_im as replacedIm')
        .where(`z.style_id = ${styleId} and z.item_id = ${itemId}`)
        return await query.getRawMany()
    }

}