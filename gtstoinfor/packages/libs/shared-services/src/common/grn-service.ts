import { CommonResponseModel, GrnDto, GrnReq, IndentDTO, SourcingRequisitionReq, grnReportReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class GRNService extends CommonAxiosService {
  URL = "/grn"
  // vendor='https://tms-backend.shahiapps.in/api/vendor-master-data/getAllVendors'


  async createGrn(dto: GrnDto): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/createGrn", dto)
  }

  async updateGrn(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/updateGrn")
  }
  
  async getAllGrn(req?:GrnReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllGrn",req)
  }

  async getGRNItemsData(req?:GrnReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getGRNItemsData",req)
  }

  async getGrnItemById(req:GrnReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getGrnItemById",req)
  }
  async getGRNNoData(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getGRNNoData")
  }
  async getPONoData(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getPONoData")
  }
  async getAllTrimStocks(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllTrimStocks")
  }
  async getGrnReportData(req?:grnReportReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getGrnReportData",req)
  }
}
