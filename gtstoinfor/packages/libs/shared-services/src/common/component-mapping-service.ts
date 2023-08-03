import { ComponentMappingDto, ComponentMappingResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class ComponentMappingService  extends CommonAxiosService{
    URL =  '/component-mapping'

    async createComponentMap(req:ComponentMappingDto):Promise<ComponentMappingResponseModel>{
        return this.axiosPostCall(this.URL + '/createComponentMapping',req)

    }

}