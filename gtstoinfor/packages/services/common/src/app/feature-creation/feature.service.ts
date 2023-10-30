import { Injectable } from '@nestjs/common';
import { FeatureRepository } from './repo/feature-repository';
import { CommonResponseModel, FeatureDTO, FeatureResponseModel } from '@project-management-system/shared-models';
import { FeatureEntity } from './entities/feature.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { FeatureOptionEntity } from './entities/feature-option-entity';
import { FeatureOpitionRepository } from './repo/feature-option-repository';

@Injectable()
export class FeatureService {
  
    constructor(
      private featureRepo: FeatureRepository,
      private featureoptioonrepo : FeatureOpitionRepository,
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

  //   async getAllFeatures():Promise<CommonResponseModel>{
  //     try{
  //         const data = await this.featureoptioonrepo.getAllFeatureOptionData()
  //         if(data.length === 0){
  //             return new CommonResponseModel(false,0,'No data found')
  //         } else{
  //             return new CommonResponseModel(true,1,'Data retrieved',data)

  //         }
  //     } catch(err){
  //         return err
  //     }
  // } this can also be used , please dont remove 
 

  async getAllFeatures(): Promise<CommonResponseModel> {
    try {
        const data = await this.featureoptioonrepo.getAllFeatureOptionData();

        const formattedData: any[] = [];

        for (const item of data) {
            const existingFeature = formattedData.find((formattedItem) => formattedItem.feature_code === item.feature_code);

            if (existingFeature) {
                const existingOptionGroup = existingFeature[item.optiongroupForFeature];

                if (existingOptionGroup) {
                    existingOptionGroup.push({
                        option_id: item.option_id,
                    });
                } else {
                    existingFeature[item.optiongroupForFeature] = [{
                        option_id: item.option_id,
                    }];
                }
            } else {
                const newFeature = {
                    feature_option_id: item.feature_option_id,
                    feature_code: item.feature_code,
                    option_group: item.optiongroupForFeature,
                    feature_name: item.feature_name,
                    [item.optiongroupForFeature]: [{
                        option_id: item.option_id,
                    }],
                };
                formattedData.push(newFeature);
            }
        }

        if (formattedData.length === 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        } else {
            return new CommonResponseModel(true, formattedData.length, 'Data retrieved', formattedData);
        }
    } catch (err) {
        return err;
    }
}


}