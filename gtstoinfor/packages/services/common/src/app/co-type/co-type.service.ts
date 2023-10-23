import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoTypeRepository } from "./co-type.repo";
import { CoTypeModel, CoTypeResponseModel } from "@project-management-system/shared-models";

@Injectable()
export class CoTypeService {
    constructor(
        private repo : CoTypeRepository
    ) { }

    async getAllCoTypeInfo():Promise<CoTypeResponseModel>{
        try{
            const data = await this.repo.find()
            let info = []
            if(data.length > 0){
                for(const rec of data){
                    info.push(new CoTypeModel(rec.coTypeId,rec.coType,rec.isActive,rec.versionFlag))
                }
                return new CoTypeResponseModel(true,1,'Data retrieved',info)
            } else{
                return new CoTypeResponseModel(false,0,'No data found',info)
            }

        } catch(err){
            throw err
        }

   }
}