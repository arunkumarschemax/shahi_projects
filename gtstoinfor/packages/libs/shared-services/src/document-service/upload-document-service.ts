import {
    DocumentsListRequest,
    UploadDocumentListDto,
    UploadDocumentListResponseModel,
} from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class UploadDocumentService extends CommonAxiosService {
    private url = "/doc-upload";

    async createDocumentsList(payload: DocumentsListRequest): Promise<UploadDocumentListResponseModel> {
        return this.axiosPostCall(this.url + "/createDocumentsList", payload)
    }

    async DocumentFileUpload(req:any): Promise<UploadDocumentListResponseModel> {
        return this.axiosPostCall(this.url + "/DocumentFileUpload",req)
    }

    async getPoNumberDropdown(): Promise<UploadDocumentListResponseModel> {
        console.log('hii')
        return this.axiosPostCall(this.url + "/getPoNumberDropdown")
    }

    async getAllDocumentDetails(): Promise<UploadDocumentListResponseModel> {
        return this.axiosPostCall(this.url + "/getAllDocumentDetails")
    }
    
}