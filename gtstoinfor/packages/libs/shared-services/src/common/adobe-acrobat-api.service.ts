import { CommonAxiosService } from "../common-axios-service-prs";

export class AdobeAcrobatApiService extends CommonAxiosService{
    private adobeAcrobatApiController = "/adobe-acrobat-api";

    async extractTextFromPdf(payload: any): Promise<any> {
        return this.axiosPostCall(this.adobeAcrobatApiController + "/extractTextFromPdf", payload)
    }
}