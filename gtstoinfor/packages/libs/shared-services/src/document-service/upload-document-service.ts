import {
    DocumentIdreq,
    DocumentsListRequest,
    PoRoleRequest,
    UploadDocumentListDto,
    UploadDocumentListResponseModel,
    poReq,
} from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class UploadDocumentService extends CommonAxiosService {
    private url = "/doc-upload";

    async createDocumentsList(payload: DocumentsListRequest): Promise<UploadDocumentListResponseModel> {
        return this.axiosPostCall(this.url + "/createDocumentsList", payload)
    }

    async DocumentFileUpload(req:any): Promise<UploadDocumentListResponseModel> {
        console.log(req,'req')
        return this.axiosPostCall(this.url + "/DocumentFileUpload",req)
    }

    async getPoNumberDropdown(): Promise<UploadDocumentListResponseModel> {
        return this.axiosPostCall(this.url + "/getPoNumberDropdown")
    }

    async getDocumentDetailsByPO(req: PoRoleRequest): Promise<UploadDocumentListResponseModel> {
        return this.axiosPostCall(this.url + "/getDocumentDetailsByPO",req)
    }

    async totalFileUploadAgainstPo(req: poReq): Promise<UploadDocumentListResponseModel> {
        return this.axiosPostCall(this.url + "/totalFileUploadAgainstPo",req)
    }
    async getDocumentuploadedStaus(req:DocumentIdreq): Promise<UploadDocumentListResponseModel> {
        return this.axiosPostCall(this.url + "/getDocumentuploadedStaus",req)
      }
}