import axios from 'axios';
import { CommonAxiosService } from "../common-axios-service-prs";
import { CommonResponseModel, FeatureDTO, FeatureResponseModel } from '@project-management-system/shared-models';


export class FeatureService extends CommonAxiosService{
URL = '/feature';

        async createFeature(req: FeatureDTO): Promise<FeatureResponseModel> {
            return this.axiosPostCall(this.URL +  '/createFeature',req)
        }
        async getAllFeatures(req:any): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL +  '/getAllFeatures',req)
        }
        async getFeatureName(): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL +  '/getFeatureName')
        }
        async getFeatureCode(): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL +  '/getFeatureCode')
        }
        async getOptionGropup(): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL +  '/getOptionGropup')
        }

        async getFeaturesInfo(): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL +  '/getFeaturesInfo')
        }

}