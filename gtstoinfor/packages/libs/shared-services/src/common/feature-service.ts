import axios from 'axios';
import { CommonAxiosService } from "../common-axios-service-prs";
import { CommonResponseModel, FeatureDTO, FeatureResponseModel } from '@project-management-system/shared-models';


export class FeatureService extends CommonAxiosService{
URL = '/feature';

        async createFeature(req: FeatureDTO): Promise<FeatureResponseModel> {
            return this.axiosPostCall(this.URL +  '/createFeature',req)
        }
        async getAllFeatures(): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL +  '/getAllFeatures')
        }

}