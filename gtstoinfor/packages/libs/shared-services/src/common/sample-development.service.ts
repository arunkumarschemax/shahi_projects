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
            id:"1",
          requestNo: "REQ001",
          date: "2023-08-01",
          location: "Sample Room A",
          pch: "PCH001",
          type: "Proto",
          buyer: "ABC Clothing",
          styleNo: "STL001",
          sampleSubType: "T-Shirt",
          style: "Casual",
          description: "Plain white cotton t-shirt",
          brand: "ABC Clothing Co.",
          costRef: "TC001",
          m3StyleNo: "12345",
          contactNo: "555-555-5555",
          extn: "123",
          sam: "4.5",
          dmm: "John Doe",
          technician: "Jane Smith",
          productType: "Apparel",
          Conversion: "N/A",
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
        },
        {
            id:"2",
          requestNo: "REQ002",
          date: "2023-08-02",
          location: "Sample Room B",
          pch: "PCH002",
          type: "Fit Sample",
          buyer: "XYZ Fashion",
          styleNo: "STL002",
          sampleSubType: "Smartphone",
          style: "High-end",
          description: "Latest model smartphone with advanced features",
          brand: "XYZ Electronics",
          costRef: "EC002",
          m3StyleNo: "67890",
          contactNo: "444-444-4444",
          extn: "456",
          sam: "2.3",
          dmm: "Sarah Johnson",
          technician: "Mark Anderson",
          productType: "Electronics",
          conversion: "N/A",
          madeIn: "China",
          Remarks: "Prototype for testing",
          fabricInfo:[
            {
            fabricCode :"FAB",
            description:"",
            color:"",
            consumption:"",
            remarks:""
            },
            {
            fabricCode :"",
            description:"",
            color:"",
            consumption:"",
            remarks:""
            }
          ],
          trimInfo:[
            {
            description:"",
            consumption:"",
            remarks:""
            },
            {
            description:"",
            consumption:"",
            remarks:""
            }
          ]
        },
        {
            id:"3",
            requestNo: "REQ003",
            date: "2023-08-03",
            location: "Sample Room C",
            pch: "PCH003",
            type: "Development",
            buyer: "DEF Apparel",
            styleNo: "STL003",
            fabricInfo:[
                {
                fabricCode :"",
                description:"",
                color:"",
                consumption:"",
                remarks:""
                },
                {
                fabricCode :"",
                description:"",
                color:"",
                consumption:"",
                remarks:""
                }
              ],
              trimInfo:[
                {
                description:"",
                consumption:"",
                remarks:""
                },
                {
                description:"",
                consumption:"",
                remarks:""
                }
              ]
        },
        {
            id:"4",
            requestNo: "REQ004",
            date: "2023-08-04",
            location: "Sample Room D",
            pch: "PCH004",
            type: "Proto",
            buyer: "GHI Fashions",
            styleNo: "STL004",
            fabricInfo:[
                {
                fabricCode :"",
                description:"",
                color:"",
                consumption:"",
                remarks:""
                },
                {
                fabricCode :"",
                description:"",
                color:"",
                consumption:"",
                remarks:""
                }
              ],
              trimInfo:[
                {
                description:"",
                consumption:"",
                remarks:""
                },
                {
                description:"",
                consumption:"",
                remarks:""
                }
              ]
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

async getSampleDevById(): Promise<any> {
    const dummyData = [
        {
            id:"1",
          requestNo: "REQ001",
          date: "2023-08-01",
          location: "Vizag",
          pch: "PCH001",
          type: "Proto",
          buyer: "Virat Kohil",
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