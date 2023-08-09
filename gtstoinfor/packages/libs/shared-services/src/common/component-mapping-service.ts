import { ComponentMappingFilterReq, ComponentMappingModel, ComponentMappingResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class ComponentMappingService  extends CommonAxiosService{
    URL =  '/component-mapping'

    async createComponentMap(req:ComponentMappingModel):Promise<ComponentMappingResponseModel>{
        return this.axiosPostCall(this.URL + '/createComponentMapping',req)
    }

    async getMappedComponents(req:ComponentMappingFilterReq):Promise<ComponentMappingResponseModel>{
        return this.axiosPostCall(this.URL + '/getMappedComponents',req)
    }

    async getStyleDropDown():Promise<ComponentMappingResponseModel>{
        return this.axiosPostCall(this.URL + '/getStyleDropDown')
    }

    async getGarmentCategoryDropDown():Promise<ComponentMappingResponseModel>{
        return this.axiosPostCall(this.URL + '/getGarmentCategoryDropDown')
    }

    async getGarmentDropDown():Promise<ComponentMappingResponseModel>{
        return this.axiosPostCall(this.URL + '/getGarmentDropDown')
    }

}