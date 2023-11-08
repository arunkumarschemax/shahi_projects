import { FeatureResponseModel, OptionEnum, RMSkuFilterReq, RmSkuReq, RmSkuResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";
export class RmSkuService extends CommonAxiosService{
    URL = '/rm-skus';

    async createRmSkus(req: RmSkuReq): Promise<RmSkuResponseModel> {
        return this.axiosPostCall(this.URL + "/createRmSku", req)
    }

    async getAllRmSKUs(req: RMSkuFilterReq): Promise<RmSkuResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllRmSKUs",req)
    }

    async getSKUCodeData(): Promise<RmSkuResponseModel> {
        return this.axiosPostCall(this.URL + "/getSKUCodeData")
    }

    async getFeatureCodeData(): Promise<RmSkuResponseModel> {
        return this.axiosPostCall(this.URL + "/getFeatureCodeData")
    }

    async getItemCodeData(): Promise<RmSkuResponseModel> {
        return this.axiosPostCall(this.URL + "/getItemCodeData")
    }

    async getOptionValueData(): Promise<RmSkuResponseModel> {
        return this.axiosPostCall(this.URL + "/getOptionValueData")
    }

    async getFeatures(): Promise<FeatureResponseModel> {
        return({status:true,internalMessage:'',errorCode:0,data:[
            {'featureName':'Feature01','description':'string','optionInfo': [{'option':['blue','white','blue','white','black']}],'option': OptionEnum.COLOR,'featureId':1,'createdUser': 'string','featureCode':'string'},
            {'featureName':'Feature02','description':'string','optionInfo': [{'option':['blue','white','blue','white','red','green','black','blue','white','red','green','black']}],'option': OptionEnum.COLOR,'featureId':2,'createdUser': 'string','featureCode':'string'},
            {'featureName':'Feature03','description':'string','optionInfo': [{'option':['blue','white','blue','white','red','green','black','blue','white','red','green','black']}],'option': OptionEnum.COLOR,'featureId':3,'createdUser': 'string','featureCode':'string'}
        ]})
            
    }
}    