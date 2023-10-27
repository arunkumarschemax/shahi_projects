import { Injectable } from '@nestjs/common';
import { FeatureRepository } from './repo/feature-repository';
import { FeatureDTO, FeatureResponseModel } from '@project-management-system/shared-models';
import { FeatureEntity } from './entities/feature.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { FeatureOptionEntity } from './entities/feature-option-entity';

@Injectable()
export class FeatureService {
  
    constructor(
      private featureRepo: FeatureRepository,
      ){}
      
    
    async createFeature(req : FeatureDTO): Promise<FeatureResponseModel>{
      try{
        const featureData = await this.featureRepo.findOne({select:['featureId'], where:{featureName : req.featureName}})
        if(featureData){
          throw new ErrorResponse(0,'Feature already exists!!!');
        }
        console.log(req,'------------------')
        const featureEntity = new FeatureEntity()
        featureEntity.featureName = req.featureName
        const data = await this.featureRepo.getFeatureId()
        const maxId = data.featureId
        const nextId = Number(maxId) + 1
        featureEntity.featureCode = "FT-" + nextId.toString().padStart(3, '0')
        featureEntity.description = req.description
        featureEntity.option = req.option
        let featureChild = []
        for(const child of req.optionInfo){
          const childData = new FeatureOptionEntity()
          childData.option = featureEntity.option,
          childData.optionId = child.optionId,
          childData.featureCode = featureEntity.featureCode
          featureChild.push(childData)
        }
        featureEntity.fChild = featureChild
        const save = await this.featureRepo.save(featureEntity)
        if(save){
          return new FeatureResponseModel(true,1,'Feature created successfully',[])
        } else {
          return new FeatureResponseModel(false,0,'Feature creation failed',[])
        }
      }catch(err){
        throw err
      }
    }


}