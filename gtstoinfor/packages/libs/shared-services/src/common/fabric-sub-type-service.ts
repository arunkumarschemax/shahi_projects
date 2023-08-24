import axios from "axios";
import { from } from "rxjs";
import { CommonAxiosService } from "../common-axios-service-prs";
import { FabricSubTypeDto, FabricSubTypeResponse,AllFabricSubTypeResponse,FabricSubTypeRequest,FabricSubTypeDropDownResponseModel,FabricTypeRequest,FabricSubTypeDropDownDto,FabricSubTypeReqId} from "@project-management-system/shared-models";

export class FabricSubtypeservice extends CommonAxiosService{
URL ='/fabric-sub-type';

async createFabricSubType (dto:FabricSubTypeDto): Promise<FabricSubTypeResponse>{
return this.axiosPostCall(this.URL + '/createFabricSubType', dto)
}

async updateFabricSubType(dto: FabricSubTypeDto): Promise<FabricSubTypeResponse>{
    return this.axiosPostCall(this.URL + '/updateFabricSubType', dto)
}

async activateOrDeactivateFabricSubType(dto: FabricSubTypeDto): Promise<FabricSubTypeResponse>{
    return this.axiosPostCall(this.URL + '/activateOrDeactivateFabricSubType', dto)
} 

async getAllFabricSubType(): Promise<AllFabricSubTypeResponse> {
    return this.axiosPostCall(this.URL + '/getAllFabricSubType')

}
async getAllFabricSubTypeDropDown(req:FabricSubTypeRequest): Promise<FabricSubTypeDropDownResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllFabricSubTypeDropDown',req)

}

async getFabricSubTypeForId(req:FabricSubTypeRequest): Promise<FabricSubTypeDropDownResponseModel> {
    return this.axiosPostCall(this.URL + '/getFabricSubTypeForId',req)

}

async getFabricSubTypeByFabricTypeId(itemCatId :FabricSubTypeReqId): Promise<AllFabricSubTypeResponse> {
    
    return this.axiosPostCall(this.URL + '/getFabricSubTypeByFabricTypeId', itemCatId)
  
}

// async activateOrDeactivateFabricSubtype(Dto: FabricSubTypeDto): Promise<FabricSubTypeResponse> {
        
//     return this.axiosPostCall(this.URL + '/activateOrDeactivateFabricSubtype', Dto)

// }
}