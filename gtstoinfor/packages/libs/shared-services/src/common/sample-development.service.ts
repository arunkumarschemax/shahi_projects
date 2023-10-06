import axios from 'axios';
import { DeliveryMethodDto, DeliveryMethodRequest } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllSampleDevReqResponseModel, SampleDevelopmentRequest, SampleFilterRequest } from '@project-management-system/shared-models';


export class SampleDevelopmentService extends CommonAxiosService{
URL = '/sample-request';

async createSampleDev(req: SampleDevelopmentRequest):Promise<any>{
    return this.axiosPostCall(this.URL +  '/createSampleDev',req)
}

        
async getAllSampleDevData(req? : SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllSampleDevData")
}

async getReqNo():Promise<any>{
    const reqData = [
        {
            reqNo:"REQ001"
        },
        {
            reqNo:"REQ002"
        },
        {
            reqNo:"REQ003"
        },
        {
            reqNo:"REQ004"
        }
    ]
    return reqData
    // return this.axiosPostCall(this.URL + "/getAllSampleDevelopment")
}
        

        

}