import { OptionEnum } from '@project-management-system/shared-models';

export class FeatureOptionDTO {
  option:OptionEnum;
  optionId:number[]; 
  featureCode?:string;  
  createdAt?: Date;
  createdUser?: string | null;
  featureChildId?:number;

  constructor(
    option:OptionEnum,
    optionId:number[],  
    featureCode?:string,  
    createdAt?: Date,
    createdUser?: string | null,
    featureChildId?:number,
  ){
    this.featureCode = featureCode
    this.option = option
    this.optionId = optionId
    this.createdAt = createdAt
    this.createdUser = createdUser
    this.featureChildId = featureChildId
  }
}

