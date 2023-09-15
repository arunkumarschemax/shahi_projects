import {
    ChallanReq,
    CommonResponseModel,
    DocumentIdreq,
    DocumentsListRequest,
    InvoiceReq,
    PoRoleRequest,
    UploadDocumentListDto,
    UploadDocumentListResponseModel,
    getFileReq,
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

      async getInvoiceByPo(req: InvoiceReq): Promise<UploadDocumentListResponseModel> {
        return this.axiosPostCall(this.url + "/getInvoiceByPo",req)
    }
    async getChallanByPOandInvoice(req: ChallanReq): Promise<UploadDocumentListResponseModel> {
        return this.axiosPostCall(this.url + "/getChallanByPOandInvoice",req)
    }
    async getFilesAgainstPoandDocument(req: getFileReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.url + "/getFilesAgainstPoandDocument",req)
    }
}
