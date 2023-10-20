import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessAreaRepository } from "./business-area.repo";
import { BusinessAreaModel, BusinessAreaResponseModel } from "@project-management-system/shared-models";

@Injectable()
export class BusinessAreaService {
    constructor(
        private repo : BusinessAreaRepository
    ) { }

    async getAllBusinessAreaInfo():Promise<BusinessAreaResponseModel>{
        try{
            const data = await this.repo.find()
            let info = []
            if(data.length > 0){
                for(const rec of data){
                    info.push(new BusinessAreaModel(rec.businessAreaId,rec.businessAreaCode,rec.businessAreaName,rec.isActive,rec.versionFlag))
                }
                return new BusinessAreaResponseModel(true,1,'Data retrieved',info)
            } else{
                return new BusinessAreaResponseModel(false,0,'No data found',info)
            }

        } catch(err){
            throw err
        }

    }
}