import axios from 'axios';
import { DeliveryMethodDto, DeliveryMethodRequest } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllSampleDevReqResponseModel, Allocatematerial, CommonResponseModel, MaterialAllocationitemsIdreq, ProductGroupReq, SampleDevelopmentRequest, SampleFilterRequest, SampleRequestFilter, SamplerawmaterialStausReq, SamplieMappingDto, UploadResponse, buyerReq, buyerandM3ItemIdReq, sampleReqIdReq, statusReq,SampleIdRequest, AllocatedLocationReq, RequestNoReq, AllocationApprovalReq, lifeCycleStatusReq, BuyerRefNoRequest, MaterailViewDto, LocationReq, requestNoReq } from '@project-management-system/shared-models';
import { create } from 'domain';


export class SampleDevelopmentService extends CommonAxiosService {
  URL = '/sample-request';

  async createSampleDevelopmentRequest(req: SampleDevelopmentRequest): Promise<AllSampleDevReqResponseModel> {
    return this.axiosPostCall(this.URL + '/createSampleDevelopmentRequest', req)
  }

  async getAllSampleDevData(req?: any): Promise<AllSampleDevReqResponseModel> {
    console.log(req, 'shared service')
    return this.axiosPostCall(this.URL + "/getAllSampleDevData", req)
  }

  async getAllSampleData(): Promise<AllSampleDevReqResponseModel> {
    // console.log(req, 'shared service')
    return this.axiosPostCall(this.URL + "/getAllSampleData")
  }

  async getstyleaginstpch(): Promise<AllSampleDevReqResponseModel> {
    // console.log(req, 'shared service')
    return this.axiosPostCall(this.URL + "/getstyleaginstpch")
  }
  async getAllSampleReqNo(): Promise<AllSampleDevReqResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllSampleReqNo")
  }

  async cancelSampleReqById(req: SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
    return this.axiosPostCall(this.URL + "/cancelSampleReqById", req)
  }

  async getAllPCH(): Promise<AllSampleDevReqResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllPCH")
  }

  async getAllStyleNo(): Promise<AllSampleDevReqResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllStyleNo")
  }
  async fileUpload(file: any): Promise<UploadResponse> {
    console.log(file)
    return await this.axiosPostCall(this.URL + '/fileUpload', file);
  }

  async fabricUpload(file: any): Promise<UploadResponse> {
    console.log(file)
    return await this.axiosPostCall(this.URL + '/fabricUpload', file);
  }

  async trimUpload(file: any): Promise<UploadResponse> {
    console.log(file)
    return await this.axiosPostCall(this.URL + '/trimUpload', file);
  }

  async getSampleRequestReport(req: SamplerawmaterialStausReq): Promise<AllSampleDevReqResponseModel> {
    return this.axiosPostCall(this.URL + "/getSampleRequestReport", req)
  }

  async getAllSampleReqDropDown(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllSampleReqDropDown")
  }

  async getIssuedSampleRequests(req?:BuyerRefNoRequest): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getIssuedSampleRequests",req)
  }

  async getSampleOrderDetails(req:SampleIdRequest): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getSampleOrderDetails",req)
  }

  async getSampleDevById(): Promise<any> {
    const dummyData = [
      {
        id: "1",
        requestNo: "REQ001",
        date: "2023-08-01",
        location: "A1F1",
        pch: "PCH001",
        user: "Admin",
        sampleType: "Proto Sample",
        buyer: "Eswar",
        styleNo: "STL001",
        sampleSubType: "T-Shirt",
        style: "Casual",
        description: "Plain white cotton t-shirt",
        brand: "Nike",
        costRef: "TC001",
        m3StyleNo: "12345",
        contactNo: "8885556666",
        extn: "123",
        sam: "4.5",
        dmm: "Rajesh",
        technician: "Suresh",
        product: "Kurtha",
        productType: "Apparel",
        Conversion: "INR",
        madeIn: "USA",
        remarks: "Sample for approval",
        fabricInfo: [
          {
            "fabricCode": "FAB001",
            "description": "Cotton Fabric",
            "color": "White",
            "consumption": "10 meters",
            "remarks": "High-quality"
          },
          {
            "fabricCode": "FAB002",
            "description": "Silk Fabric",
            "color": "Blue",
            "consumption": "5 meters",
            "remarks": "Luxurious texture"
          }
        ],
        trimInfo: [
          {
            "description": "Buttons",
            "consumption": "20 pieces",
            "remarks": "Metallic buttons"
          },
          {
            "description": "Thread",
            "consumption": "2 spools",
            "remarks": "Matching color thread"
          }
        ]
      }
    ]
    return dummyData
  }
  async getFabricCodes(): Promise<UploadResponse> {
    return await this.axiosPostCall(this.URL + '/getFabricCodes');
  }
  async getTrimCodes(): Promise<UploadResponse> {
    return await this.axiosPostCall(this.URL + '/getTrimCodes');
  }
  async getTrimType(): Promise<UploadResponse> {
    return await this.axiosPostCall(this.URL + '/getTrimType');
  }
  async getTrimCodeAgainstTrimType(req: ProductGroupReq): Promise<UploadResponse> {
    return await this.axiosPostCall(this.URL + '/getTrimCodeAgainstTrimType', req);
  }
  async getM3StyleCode(): Promise<UploadResponse> {
    return await this.axiosPostCall(this.URL + '/getM3StyleCode');
  }

  async getSampleInventory(req?: SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
    console.log(req, 'shared service')
    return this.axiosPostCall(this.URL + "/getSampleInventory", req)
  }

  async getAllRequestNo(): Promise<UploadResponse> {
    return this.axiosPostCall(this.URL + "/getAllRequestNo")
  }

  async getAllBuyers(): Promise<UploadResponse> {
    return this.axiosPostCall(this.URL + "/getAllBuyers")
  }

  async getAllSampleReportData(req?: SampleRequestFilter): Promise<UploadResponse> {
    console.log(req, 'shared service')
    return this.axiosPostCall(this.URL + "/getAllSampleReportData", req)
  }

  async createMapping(req: any): Promise<AllSampleDevReqResponseModel> {
    console.log(req,'shared service')
    return this.axiosPostCall(this.URL + "/createSampling", req)

  }
  async getAvailbelQuantityAginstBuyerAnditem(req: buyerandM3ItemIdReq): Promise<CommonResponseModel> {
    console.log(req,'shared service')
    return this.axiosPostCall(this.URL + "/getAvailbelQuantityAginstBuyerAnditem", req)

  }
  async creatematerialAlloction(req: Allocatematerial): Promise<CommonResponseModel> {
    console.log(req,'shared service')
    return this.axiosPostCall(this.URL + "/creatematerialAlloction", req)

  }
  
  async getAllMaterialAllocation(req?:buyerReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllMaterialAllocation",req )

  }
  async updateStatus(req?:statusReq  ): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/updateStatus",req )

  }
  async getTrimDetailsOfSample(req:sampleReqIdReq  ): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getTrimDetailsOfSample",req )

  }
  async getfabricDetailsOfSample(req:sampleReqIdReq  ): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getfabricDetailsOfSample",req )

  }

  async getallMaterialAllocationItemsById(req:MaterialAllocationitemsIdreq  ): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getallMaterialAllocationItemsById",req )

  }

  async getAllocatedBomInfo(req?:RequestNoReq): Promise<CommonResponseModel> {
    console.log('----shared ser',req)
    return this.axiosPostCall(this.URL + "/getAllocatedBomInfo",req )
  }

  async allocatedLocationInfo(req:AllocatedLocationReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/allocatedLocationInfo" ,req)
  }

  async approvaAllocatedStock(req:AllocationApprovalReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/approvaAllocatedStock" ,req)
  }

  async getAllAllocatedRequestNo(req?:BuyerRefNoRequest): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllAllocatedRequestNo",req )
  }

  async getAllApprovedRequestNo(req?:BuyerRefNoRequest): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllApprovedRequestNo",req )
  }
  async updatedispatch(req?:lifeCycleStatusReq): Promise<CommonResponseModel> {
    
    return this.axiosPostCall(this.URL + "/updatedispatch" ,req)
  }

  async getPickListInfo(req?:requestNoReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getPickListInfo",req )
  }

  async getAllMaterialIssue(): Promise<CommonResponseModel> {
    
    return this.axiosPostCall(this.URL + "/getmaterialissue" )
  }
  async getbyID(req?:RequestNoReq): Promise<CommonResponseModel> {
    
    return this.axiosPostCall(this.URL + "/getbyID" ,req)
  }

  async getRequestno(req?:RequestNoReq): Promise<CommonResponseModel> {
    
    return this.axiosPostCall(this.URL + "/getRequestno" ,req)
  }
  async allocatedLocation(req:LocationReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/allocatedLocation" ,req)
  }
  async getPch(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getPch" )
  }
  async getStyle(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getStyle" )
  }
  async getAllSampleRequestsInfo(req:sampleReqIdReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllSampleRequestsInfo",req )
  }
  async getAllSampleRequestSizesInfo(req:sampleReqIdReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllSampleRequestSizesInfo",req )
  }
}
