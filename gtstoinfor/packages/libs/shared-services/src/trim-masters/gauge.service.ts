import {CommonResponseModel, GaugeDTO,} from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class GaugeService extends CommonAxiosService{
    URL = '/gauge';
    
    
    async getAllGauge(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/getAllGauge')
    }
    
    async createGauge(req:GaugeDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/createGauge',req)
    }

    async  updateGauge(dto: GaugeDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/updateGauge', dto)
    }
    
    async  activateOrDeactivateGauge(dto: GaugeDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/activateOrDeactivateGauge', dto)
    }
    
    async  getAllActiveGauge(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllActiveGauge')
    }
    
    async  getGaugeById(req: GaugeDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getGaugeById',req)
    }

}