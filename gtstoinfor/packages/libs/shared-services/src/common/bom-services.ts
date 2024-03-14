import { BomCreationFiltersReq, BomExcelreq, BomGenerationReq, BomPrintFilterReq, BomPrintInfoModel, BomProposalReq, CommonResponseModel, DestinationreqModel, ItemInfoFilterReq, PpmDateFilterRequest, StyleIdReq, StyleNumberReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class BomService extends CommonAxiosService {
    private URL = "/bom";

    async createBom(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/createBom", req)
    }

    async getAllStylesData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllStylesData")
    }
    async getPpmPoLineData(req: PpmDateFilterRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getPpmPoLineData", req)
    }
    async getAllTrimInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllTrimInfo")
    }

    async getBomInfoAgainstStyle(req: StyleNumberReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getBomInfoAgainstStyle", req)
    }

    async getItemInfo(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getItemInfo", req)
    }

    async getItemDropdownByCreatedAt(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getItemDropdownByCreatedAt", req)
    }

    async getRegionDropdownByCreatedAt(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getRegionDropdownByCreatedAt", req)
    }

    async getBomPrintInfo(req: BomPrintFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getBomPrintInfo", req)
    }

    async getStylesData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getStylesData")
    }
    async getPoLineDataForCihinaInserttag(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getPoLineDataForCihinaInserttag", req)
    }
    async getBomDataForStyle(req: StyleIdReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getBomDataForStyle", req)
    }

    async getBomCreationData(req: BomCreationFiltersReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getBomCreationData", req)
    }

    async generateBom(req: BomGenerationReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/generateBom", req)
    }

    async saveExcelData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/saveExcelData', req);
    }

    async generateProposal(req: BomProposalReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/generateProposal", req)
    }

    async getbomExcel(req: BomCreationFiltersReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getbomexcel", req)
    }
    async getbom(req: number[]): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getbom", req)
    }

    async getStyle(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getStyle")
    }

    async getGeoCode(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getGeoCode")
    }
    async generateProposalForButton(req: BomProposalReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/generateProposalForButton", req)
    }
    async generateProposalForNeckTape(req: BomProposalReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/generateProposalForNeckTape", req)
    }
    async generateProposalForTrims(req: BomProposalReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/generateProposalForTrims", req)
    }
    async generateProposalForElasticTrim(req: BomProposalReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/generateProposalForElasticTrim", req)
    }
    async generatePropsalForHtLabel(req: BomProposalReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/generatePropsalForHtLabel", req)
    }
    async getSizeHtLabelData(req: BomProposalReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getSizeHtLabelData", req)
    }


    async generateProposalForTissuePaper(req: BomProposalReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/generateProposalForTissuePaper", req)
    }

    async getMainWovenLableData(req: BomProposalReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getMainWovenLableData", req)
    }

    async getAllConsumptionRequiredTrims(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllConsumptionRequiredTrims")
    }
    async getSizeStrip(req: BomProposalReq): Promise<CommonResponseModel> {
        console.log(req)
        return this.axiosPostCall(this.URL + "/getSizeStrip", req)
    }
    async getProductCodeDropdownByCreatedAt(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getProductCodeDropdownByCreatedAt", req)
    }
    async getSeasonCodeDropdownByCreatedAt(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getSeasonCodeDropdownByCreatedAt", req)
    } 

    async getSeasonYearDropdownByCreatedAt(req: ItemInfoFilterReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getSeasonYearDropdownByCreatedAt", req)
    }
    async getImcodes( ): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getImcodes")
    }
    
}
