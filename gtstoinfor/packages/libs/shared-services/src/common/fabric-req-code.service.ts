import axios from "axios";
import { from } from "rxjs";
import { CommonAxiosService } from "../common-axios-service-prs";
import { FabricTypesDto,FabricTypeResponse,AllFabricTypesResponse, CommonResponseModel, FabricRequestCodeDto, TrimRequestCodeDto } from "@project-management-system/shared-models";


export class FabricRequestCodeService extends CommonAxiosService{
    URL ='/item-req-code';

    async createFabricRequestedCode(dto:FabricRequestCodeDto): Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/createFabricRequestedCode', dto)
    }

    async getAllFabrics(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllFabrics')
    }

    async createTrimRequestedCode(dto:TrimRequestCodeDto): Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/createTrimRequestedCode', dto)
    }

    async getAllTrims(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllTrims')
    }
    
    
}
