import { Injectable } from '@nestjs/common';

import { zFactorsDto } from './dto/z-factors-dto';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { ZFactorsRepo } from './repo/z-factors-repo';
import { ZFactorsEntity } from './entittes/z-factors.entity';
import { ZFactorsBomEntity } from './entittes/z-factors-bom.entity';

@Injectable()
export class ZFactorServices {
    constructor(
        private zFactorRepo: ZFactorsRepo
    ) { }

    async createZfactors(req: zFactorsDto): Promise<CommonResponseModel> {
        try {
            const entity = new ZFactorsEntity();
            entity.action = req.action;

            let zFactorArray = [];

            for (const zfactor of req.Zfactordto) {
                const zFactorEntity = new ZFactorsBomEntity();
                zFactorEntity.itemName = zfactor.itemName;
                zFactorEntity.imCode = zfactor.imCode;
                zFactorEntity.geoCode = zfactor.geoCode;
                zFactorEntity.destination = zfactor.destination;
                zFactorEntity.size = zfactor.size;
                zFactorEntity.gender = zfactor.gender;
                zFactorEntity.plant = zfactor.plant;
                zFactorEntity.style = zfactor.style;
                zFactorEntity.sequence = zfactor.sequence;

                zFactorArray.push(zFactorEntity); 
            }
            entity.zFactorBom = zFactorArray;

            const save = await this.zFactorRepo.save(entity);
            if (save) {
                return new CommonResponseModel(true, 1, 'Created Successfully');
            } else {
                return new CommonResponseModel(false, 0, 'Something Went Wrong');
            }
        } catch (err) {
            throw err;
        }
    }
}
