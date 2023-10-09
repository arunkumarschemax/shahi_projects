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
    console.log(req,'shared service')
    return this.axiosPostCall(this.URL + "/getAllSampleDevData",req)
}

async getAllSampleReqNo():Promise<AllSampleDevReqResponseModel>{
    return this.axiosPostCall(this.URL + "/getAllSampleReqNo")
}

async cancelSampleReqById(req : SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
    return this.axiosPostCall(this.URL + "/cancelSampleReqById",req)
}
        
async getAllPCH():Promise<AllSampleDevReqResponseModel>{
    return this.axiosPostCall(this.URL + "/getAllPCH")
}

async getAllStyleNo():Promise<AllSampleDevReqResponseModel>{
    return this.axiosPostCall(this.URL + "/getAllStyleNo")
}
        

}