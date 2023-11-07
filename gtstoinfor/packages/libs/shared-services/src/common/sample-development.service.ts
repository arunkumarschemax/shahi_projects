import axios from 'axios';
import { DeliveryMethodDto, DeliveryMethodRequest } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllSampleDevReqResponseModel, SampleDevelopmentRequest, SampleFilterRequest, UploadResponse } from '@project-management-system/shared-models';


export class SampleDevelopmentService extends CommonAxiosService {
  URL = '/sample-request';

  async createSampleDevelopmentRequest(req: SampleDevelopmentRequest): Promise<AllSampleDevReqResponseModel> {
    return this.axiosPostCall(this.URL + '/createSampleDevelopmentRequest', req)
  }

  async getAllSampleDevData(req?: SampleFilterRequest): Promise<AllSampleDevReqResponseModel> {
    console.log(req, 'shared service')
    return this.axiosPostCall(this.URL + "/getAllSampleDevData", req)
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

  async getSampleRequestReport(): Promise<AllSampleDevReqResponseModel> {
    return this.axiosPostCall(this.URL + "/getSampleRequestReport")
  }

  async getSampleDevById(): Promise<any> {
      const dummyData = [
          {
              id:"1",
            requestNo: "REQ001",
            date: "2023-08-01",
            location: "A1F1",
            pch: "PCH001",
            user:"Admin",
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
            product:"Kurtha",
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




}