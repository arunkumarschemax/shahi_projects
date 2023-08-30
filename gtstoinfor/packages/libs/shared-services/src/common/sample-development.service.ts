import axios from 'axios';
import { DeliveryMethodDto, DeliveryMethodRequest } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";
import { SampleDevelopmentRequest, SampleFilterRequest } from '@project-management-system/shared-models';


export class SampleDevelopmentService extends CommonAxiosService{
URL = '/sample-development';

async createSampleDev(req: SampleDevelopmentRequest):Promise<any>{
    return this.axiosPostCall(this.URL +  '/createSampleDev',req)
}

        
async getAllSampleDevelopment(req? : SampleFilterRequest): Promise<any> {
    const dummyData = [
        {
          requestNo: "REQ001",
          date: "2023-08-01",
          location: "Sample Room A",
          pch: "PCH001",
          type: "Proto",
          buyer: "ABC Clothing",
          styleNo: "STL001",
        },
        {
          requestNo: "REQ002",
          date: "2023-08-02",
          location: "Sample Room B",
          pch: "PCH002",
          type: "Fit Sample",
          buyer: "XYZ Fashion",
          styleNo: "STL002",
        },
        {
            requestNo: "REQ003",
            date: "2023-08-03",
            location: "Sample Room C",
            pch: "PCH003",
            type: "Development",
            buyer: "DEF Apparel",
            styleNo: "STL003",
        },
        {
            requestNo: "REQ004",
            date: "2023-08-04",
            location: "Sample Room D",
            pch: "PCH004",
            type: "Proto",
            buyer: "GHI Fashions",
            styleNo: "STL004",
        },
        // Add more dummy data objects as needed
      ];
      return dummyData
    // return this.axiosPostCall(this.URL + "/getAllSampleDevelopment")
}

async getReqNo():Promise<any>{
    const reqData = [
        {
            reqNo:"REQ001"
        },
        {
            reqNo:"REQ002"
        },
        {
            reqNo:"REQ003"
        },
        {
            reqNo:"REQ004"
        }
    ]
    return reqData
    // return this.axiosPostCall(this.URL + "/getAllSampleDevelopment")
}
        

        

}