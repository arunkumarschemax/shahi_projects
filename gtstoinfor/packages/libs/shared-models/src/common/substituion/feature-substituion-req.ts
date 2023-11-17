import { StatusEnum } from "../../enum";

export class FeatureSubstituionReq{
    fgItemId: number;
    fgItemCode: string;
    rmInfo: RMInfoReq[];

    constructor(fgItemId: number,fgItemCode: string,rmInfo: RMInfoReq[]){
        this.fgItemId = fgItemId
        this.fgItemCode = fgItemCode
        this.rmInfo = rmInfo
    }
}

export class RMInfoReq{
    rmItemId: number;
    rmItemCode: string;
    rmSkuCode: string;
    featureId: number;
    featureCode: string;
    fgOption: string;
    fgOptionValue: string;
    rmOption: string;
    rmOptionValue: string;
    status: StatusEnum;

    constructor(rmItemId: number,rmItemCode: string,rmSkuCode: string,featureId: number,featureCode: string,fgOption: string,fgOptionValue: string,rmOption: string,rmOptionValue: string,status: StatusEnum){
    this.rmItemId = rmItemId
    this.rmItemCode = rmItemCode
    this.rmSkuCode = rmSkuCode
    this.featureId = featureId
    this.featureCode = featureCode
    this.fgOption = fgOption
    this.fgOptionValue = fgOptionValue
    this.rmOption = rmOption
    this.rmOptionValue = rmOptionValue
    this.status = status
    }

}