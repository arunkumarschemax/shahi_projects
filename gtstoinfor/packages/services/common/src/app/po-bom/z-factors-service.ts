import { Injectable } from '@nestjs/common';


import { CommonResponseModel } from '@project-management-system/shared-models';
import { ZFactorsRepo } from './repo/z-factors-repo';
import { ZFactorsEntity } from './entittes/z-factors.entity';
import { ZFactorsBomEntity } from './entittes/z-factors-bom.entity';
import { log } from 'winston';

@Injectable()
export class ZFactorServices {
    constructor(
        private zFactorRepo: ZFactorsRepo
    ) { }

    

    async getGeoCode(): Promise<CommonResponseModel> {
        const records = await this.zFactorRepo;
        const query = `SELECT des.destinationId,des.geoCode FROM destination des GROUP BY geoCode`
        const result = await this.zFactorRepo.query(query)
        if (result) {
            return new CommonResponseModel(true, 1, 'Data Retrived', result)
        } else {
            return new CommonResponseModel(false, 0, 'No Data', [])
    
        }
    }

    async getPlantCode(): Promise<CommonResponseModel> {
        const records = await this.zFactorRepo;
        const query = `SELECT plant FROM dpom`
        const result = await this.zFactorRepo.query(query)
        if (result) {
            return new CommonResponseModel(true, 1, 'Data Retrived', result)
        } else {
            return new CommonResponseModel(false, 0, 'No Data', [])
    
        }
    }
}
