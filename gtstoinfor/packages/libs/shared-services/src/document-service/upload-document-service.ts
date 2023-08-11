import {
    UploadDocumentListDto,
    UploadDocumentListResponseModel,
} from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class UploadDocumentService extends CommonAxiosService {
    private url = "/doc-upload";

    async createDocumentsList(payload: UploadDocumentListDto): Promise<UploadDocumentListResponseModel> {
        return this.axiosPostCall(this.url + "/createDocumentsList", payload)
    }

    async DocumentFileUpload(): Promise<UploadDocumentListResponseModel> {
        return this.axiosPostCall(this.url + "/DocumentFileUpload")
    }

    async getPoNumberDropdown(): Promise<UploadDocumentListResponseModel> {
        console.log('hii')
        return this.axiosPostCall(this.url + "/getPoNumberDropdown")
    }

}