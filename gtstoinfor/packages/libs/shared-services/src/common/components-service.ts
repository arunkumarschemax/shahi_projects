import axios from 'axios';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllComponentsResponseModel, ComponentRequest, ComponentResponseModel, ComponentsDto } from '@project-management-system/shared-models';


export class ComponentService extends CommonAxiosService{
URL = '/components';


async createComponent(componentsDto: ComponentsDto): Promise<ComponentResponseModel> {
    return this.axiosPostCall(this.URL +  '/createComponent',componentsDto)
}

async  updateComponents(componentsDto: ComponentsDto): Promise<ComponentResponseModel> {
    return this.axiosPostCall(this.URL + '/updateComponents', componentsDto)
}

async getAllComponents(): Promise<AllComponentsResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllComponents")
    
}

async  activateOrDeactivateComponent(componentsDto: ComponentsDto): Promise<ComponentResponseModel> {
    return this.axiosPostCall(this.URL + '/activateOrDeactivateComponent', componentsDto)
 
}

async  getAllActiveComponents(): Promise<AllComponentsResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveComponents')
}

async getActiveComponentById(req : ComponentRequest): Promise<ComponentResponseModel> {
    return this.axiosPostCall(this.URL + '/getDeliveryMethodById',req)
  }

// async getActiveDeliveryMethodsCount(): Promise<AllComponentsResponseModel> {
//     return this.axiosPostCall(this.URL + '/getActiveDeliveryMethodsCount')
// }

}