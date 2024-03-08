import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PoBomEntity } from "../entittes/po-bom.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DpomEntity } from "../../dpom/entites/dpom.entity";
import { BomEntity } from "../entittes/bom-entity";
import { BomProposalDataModel, BomProposalReq } from "@project-management-system/shared-models";
import { ZFactorsEntity } from "../entittes/z-factors.entity";
import { ZFactorsBomEntity } from "../entittes/z-factors-bom.entity";

@Injectable()
export class ZFactorsBomRepo extends Repository<ZFactorsBomEntity> {
    constructor(@InjectRepository(ZFactorsBomEntity) private zFactorsBomRepo: Repository<ZFactorsBomEntity>
    ) {
        super(zFactorsBomRepo.target, zFactorsBomRepo.manager, zFactorsBomRepo.queryRunner);
    }


    async getZfactorBomValues(itemId){
        const query = this.createQueryBuilder('zb')
        .select('zb.id,zb.im_code as imCode,zb.item_name as itemName,zb.geo_code as geoCode,zb.destination,zb.size,z.actual_im as actualIm,z.item_id as itemId,zb.plant_code as plantCode,zb.is_equal_to as isEqualTo')
        .leftJoin(ZFactorsEntity,'z','z.id = zb.zfactor_id')
        .where(`z.item_id = ${itemId} and z.action = 'ALTER'`)
        return await query.getRawMany()
        
    }

    
    async getZfactorBomValuesToAdd(){
        const query = this.createQueryBuilder('zb')
        .select('zb.id,zb.im_code as imCode,zb.item_name as itemName,zb.geo_code as geoCode,zb.destination,zb.size,z.actual_im as actualIm,z.item_id as itemId,zb.plant_code as plantCode,zb.is_equal_to as isEqualTo')
        .leftJoin(ZFactorsEntity,'z','z.id = zb.zfactor_id')
        .where(`z.action = 'ADD'`)
        return await query.getRawMany()
        
    }
}

