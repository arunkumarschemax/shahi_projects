import { ComponentMappingModel, ComponentMappingResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class ComponentMappingService  extends CommonAxiosService{
    URL =  '/component-mapping'

    async createComponentMap(req:ComponentMappingModel):Promise<ComponentMappingResponseModel>{
        return this.axiosPostCall(this.URL + '/createComponentMapping',req)
    }

    async getMappedComponents():Promise<ComponentMappingResponseModel>{
        return this.axiosPostCall(this.URL + '/getMappedComponents')
    }

}