import axios from "axios";
import { from } from "rxjs";
import { CommonAxiosService } from "../common-axios-service-prs";
import { AccountControlObjectDto,AccountControlObjectResponse,AllAccountControlObjectResponse,AccountControlObjectRequest,AccountControlObjectDropDownResponseModel,AccountControlObjectNameRequest, AccountControlObjectResponseModel } from "@project-management-system/shared-models";


export class AccountControlObjectservice extends CommonAxiosService{
URL ='/account_control_objects';

async createAccountControlObject (dto:AccountControlObjectDto): Promise<AccountControlObjectResponse>{
return this.axiosPostCall(this.URL + '/createAccountControlObject', dto)
}

async updateAccountControlObject(dto: AccountControlObjectDto): Promise<AccountControlObjectResponse>{
    return this.axiosPostCall(this.URL + '/updateAccountControlObject', dto)
}

async activateOrDeactivateAccountControlObject(dto: AccountControlObjectRequest): Promise<AccountControlObjectResponse>{
    return this.axiosPostCall(this.URL + '/activateOrDeactivateAccountControlObject', dto)
} 

async getAllAccountControlObject(): Promise<AllAccountControlObjectResponse> {
    return this.axiosPostCall(this.URL + '/getAllAccountControlObject')

}
async getAllAccountControlObjectDropDown(req:AccountControlObjectRequest): Promise<AccountControlObjectDropDownResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllAccountControlObjectDropDown',req)

}

async getAccountControlObjectForId(req:AccountControlObjectRequest): Promise<AccountControlObjectDropDownResponseModel> {
    return this.axiosPostCall(this.URL + '/getAccountControlObjectForId',req)

}

async getActiveAccountControlObjectById(req:AccountControlObjectRequest): Promise<AccountControlObjectResponseModel> {
    
    return this.axiosPostCall(this.URL + '/getActiveAccountControlObjectById', req)
  
}

async getAllActiveAccountControlObject(): Promise<AllAccountControlObjectResponse> {
    return this.axiosPostCall(this.URL + '/getAllActiveAccountControlObject')

}

// async activateOrDeactivateFabricSubtype(Dto: FabricSubTypeDto): Promise<FabricSubTypeResponse> {
        
//     return this.axiosPostCall(this.URL + '/activateOrDeactivateFabricSubtype', Dto)

// }
}