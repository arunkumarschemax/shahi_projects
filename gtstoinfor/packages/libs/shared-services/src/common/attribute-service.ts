import axios from 'axios';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllAttributesResponse, AttributeResponse, AttributesDto } from '@project-management-system/shared-models';


export class AttributeService extends CommonAxiosService{
URL = '/attributes';


async createAttribute( dto: AttributesDto): Promise<AttributeResponse> {
    return this.axiosPostCall(this.URL +  '/createAttribute',dto)
}

async  updateAttribute(dto: AttributesDto): Promise<AttributeResponse> {
    return this.axiosPostCall(this.URL + '/updateAttribute', dto)
}

async getAllAttributes(): Promise<AllAttributesResponse> {
    return this.axiosPostCall(this.URL + "/getAllAttributes")
    
}

async  activateOrDeactivateAttributes(dto: AttributesDto): Promise<AttributeResponse> {
    return this.axiosPostCall(this.URL + '/activateOrDeactivateAttributes', dto)
 
}

async  getAllActiveAttributes(): Promise<AllAttributesResponse> {
    return this.axiosPostCall(this.URL + '/getAllActiveAttributes')
}

// async getActiveComponentById(req : ComponentRequest): Promise<ComponentResponseModel> {
//     return this.axiosPostCall(this.URL + '/getDeliveryMethodById',req)
//   }

// async getActiveDeliveryMethodsCount(): Promise<AllComponentsResponseModel> {
//     return this.axiosPostCall(this.URL + '/getActiveDeliveryMethodsCount')
// }

async  getAttributeByAttributeAgainst(req): Promise<AllAttributesResponse> {
    return this.axiosPostCall(this.URL + '/getAttributeByAttributeAgainst',req)
}


}