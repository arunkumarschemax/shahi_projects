import { Injectable } from '@nestjs/common';
import { FeatureRepository } from './repo/feature-repository';
import { CommonResponseModel, FeatureDTO, FeatureFilterRequest, FeatureModel, FeatureOptionModel, FeatureResponseModel, FgItemCreIdRequest, OptionEnum } from '@project-management-system/shared-models';
import { FeatureEntity } from './entities/feature.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { FeatureOptionEntity } from './entities/feature-option-entity';
import { FeatureOpitionRepository } from './repo/feature-option-repository';
import { ColourService, DestinationService, SizeService } from '@project-management-system/shared-services';

@Injectable()
export class FeatureService {
  
    constructor(
      private featureRepo: FeatureRepository,
      private featureoptioonrepo : FeatureOpitionRepository,
      private colorService : ColourService,
      private sizeService : SizeService,
      private destinationService: DestinationService
      ){}
      
    
    async createFeature(req : FeatureDTO): Promise<FeatureResponseModel>{
      try{
        const featureData = await this.featureRepo.findOne({select:['featureId'], where:{featureName : req.featureName}})
        if(featureData){
          throw new ErrorResponse(0,'Feature already exists!!!');
        }
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
          childData.optionValue = child.optionValue,
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


 

  async getAllFeatures(req?:FeatureFilterRequest): Promise<CommonResponseModel> {
    try {
        const data = await this.featureoptioonrepo.getAllFeatureOptionData(req);

        const formattedData: any[] = [];

        for (const item of data) {
            const existingFeature = formattedData.find((formattedItem) => formattedItem.feature_code === item.feature_code);

            if (existingFeature) {
                const existingOptionGroup = existingFeature[item.optiongroupForFeature];

                if (existingOptionGroup) {
                    existingOptionGroup.push({
                        option_id: item.option_id,
                        optionValue:item.optionValue,
                    });
                } else {
                    existingFeature[item.optiongroupForFeature] = [{
                        option_id: item.option_id,
                        optionValue:item.optionValue,
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
                        optionValue:item.optionValue,
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
async getFeatureCode(): Promise<CommonResponseModel> {
  const data = await this.featureoptioonrepo.getFeatureCode()
  if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
  else
      return new CommonResponseModel(false, 0, 'No data found');
}
async getFeatureName(): Promise<CommonResponseModel> {
  const data = await this.featureRepo.getFeatureName()
  if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
  else
      return new CommonResponseModel(false, 0, 'No data found');
}
async getOptionGropup(): Promise<CommonResponseModel> {
  const data = await this.featureoptioonrepo.getOptionGropup()
  if (data.length > 0)
      return new CommonResponseModel(true, 1, 'data retrived', data)
  else
      return new CommonResponseModel(false, 0, 'No data found');
}

  async getFeaturesInfo(): Promise<CommonResponseModel>{
    try{
      const colorInfo = await this.colorService.getAllColour()
      const colorMap = new Map<number,string>()
      colorInfo.data.forEach(co => colorMap.set(co.colourId,co.colour))
      const sizeInfo = await this.sizeService.getAllSize()
      const sizeMap = new Map<number,string>()
      sizeInfo.data.forEach(s => sizeMap.set(s.sizeId,s.size))
      const destInfo = await this.destinationService.getAllDestination()
      const destMap = new Map<number,string>()
      destInfo.data.forEach(des => destMap.set(des.destinationId,des.destination))
      const data = await this.featureRepo.find({relations:['fChild']})
      let featureInfo = []
      if (data.length > 0){
        for(const rec of data){
          let featureOptions: FeatureOptionModel[] =[]
          let featureOptionInfo = []
          for(const val of rec.fChild){
            if(rec.option === OptionEnum.COLOR){
              featureOptionInfo.push(colorMap.get(val.optionId))
            } else if(rec.option === OptionEnum.SIZE){
              featureOptionInfo.push(sizeMap.get(val.optionId))
            } else if(rec.option === OptionEnum.DESTINATION){
              featureOptionInfo.push(destMap.get(val.optionId))
            }
          }
          featureOptions.push(new FeatureOptionModel(featureOptionInfo))
          featureInfo.push(new FeatureModel(rec.featureId,rec.featureCode,rec.featureName,rec.option,featureOptions,rec.description,rec.fChild))
        }
      return new CommonResponseModel(true, 1, 'data retrived', featureInfo)
      } else {
      return new CommonResponseModel(false, 0, 'No data found');
      }
    }catch(err){
      throw err
    }
  }


}