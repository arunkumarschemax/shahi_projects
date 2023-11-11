import axios from "axios";
import { from } from "rxjs";
import { CommonAxiosService } from "../common-axios-service-prs";
import { FabricTypesDto,FabricTypeResponse,AllFabricTypesResponse } from "@project-management-system/shared-models";


export class FabricTypeService extends CommonAxiosService{
    URL ='/fabricType';

    async createFabricType(dto:FabricTypesDto): Promise<FabricTypeResponse>{
        console.log(dto,'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
        return this.axiosPostCall(this.URL + '/createFabricType', dto)
    } 
    async updateFabricType(dto: FabricTypesDto): Promise<FabricTypeResponse>{
        return this.axiosPostCall(this.URL + '/updateFabricType', dto)
    } 
    async activateOrDeactivateFabricType(dto: FabricTypesDto): Promise<FabricTypeResponse>{
        return this.axiosPostCall(this.URL + '/activateOrDeactivateFabricType', dto)
    } 
    async getAllFabricType(): Promise<AllFabricTypesResponse> {
        return this.axiosPostCall(this.URL + '/getAllFabricType')

    }
    
    async getAllActiveFabricType(): Promise<AllFabricTypesResponse> {
        return this.axiosPostCall(this.URL + '/getAllActiveFabricType')

    }

    async getTrimTypes(): Promise<AllFabricTypesResponse> {
        return this.axiosPostCall(this.URL + '/getTrimTypes')

    }
    
    
}
