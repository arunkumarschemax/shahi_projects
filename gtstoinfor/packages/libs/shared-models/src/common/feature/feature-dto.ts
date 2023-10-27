import { OptionEnum } from "../../enum";

export class FeatureDTO {
  featureName:string;
  description:string;
  optionInfo: any[]
  option: OptionEnum
  featureId?:number;
  createdAt?: Date;
  createdUser?: string | null;
  featureCode?:string;

  constructor(
    featureName:string,
    description:string,
    optionInfo : any[],
    option: OptionEnum,
    featureId?:number,
    createdAt?: Date,
    createdUser?: string | null,
    featureCode?:string,
  ){
    this.featureName = featureName
    this.description = description
    this.optionInfo = optionInfo
    this.option = option
    this.featureId = featureId
    this.createdAt = createdAt
    this.createdUser = createdUser
    this.featureCode = featureCode
  }
}

