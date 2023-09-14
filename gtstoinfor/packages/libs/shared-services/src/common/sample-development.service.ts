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
          location: "Banglore",
          pch: "KNT",
          type: "Proto Sample",
          buyer: "WALMT001",
          styleNo: "FB16101B",
          sampleSubType: "T-Shirt",
          style: "Casual",
          description: "FB16101B - Boys SS Stripe EOE V-Neck Tee",
          brand: "ABC Clothing Co.",
          costRef: "410",
          m3StyleNo: "12345",
          contactNo: "9993335555",
          extn: "2867",
          sam: "4.5",
          dmm: "John Doe",
          technician: "Jane Smith",
          productType: "Apparel",
          Conversion: "N/A",
          madeIn: "USA",
          status:"Open",
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
          location: "Coimbatore",
          pch: "LTY",
          type: "Concept Sample",
          buyer: "Walmart Store INC.",
          styleNo: "FB16123A",
          sampleSubType: "Smartphone",
          style: "High-end",
          description: "Latest model smartphone with advanced features",
          brand: "XYZ Electronics",
          costRef: "EC002",
          m3StyleNo: "67890",
          contactNo: "444-444-4444",
          extn: "456",
          sam: "2.3",
          status:"In Progress",
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
            styleNo: "FB16156T",
            status:"Completed",
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
            styleNo: "FB14923A",
            status:"In Progress",
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
          location: "Coimbatore",
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