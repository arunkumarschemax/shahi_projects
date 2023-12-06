import axios from 'axios';
import { CommonAxiosService } from "../common-axios-service-prs";
import { BuyerIdReq, ExternalRefReq, SampleFilterRequest, SourceIssuesRequest, buyerReq } from '@project-management-system/shared-models';


export class SourceIssuesService extends CommonAxiosService {

    materialIssueController = "/material-issue"

    async getAllMaterialIssues(req?:buyerReq) {
        return this.axiosPostCall(this.materialIssueController + "/getAllMaterialIssues",req)
    }

    async getAllSourceIssues( req? :SampleFilterRequest ): Promise<any>{
        const dummyData=[
            {
                consumptionCode:"CON001",
                requestNo: "REQ001",
                date: "2023-08-01",               
                buyer: "ABC Clothing",
                styleNo: "STL001",
                sampleIndentDate: "2023-08-01",
                poNumber:"PO001",
              },
              {
                consumptionCode:"CON002",
                requestNo: "REQ002",
                date: "2023-08-02",
                buyer: "XYZ Fashion",
                styleNo: "STL002",
                sampleIndentDate: "2023-08-02",
                poNumber:"PO002",
              },
              {
                consumptionCode:"CON003",
                requestNo: "REQ003",
                date: "2023-08-03",
                buyer: "DEF Apparel",
                styleNo: "STL003",
                sampleIndentDate: "2023-08-03",
                poNumber:"PO003",
            },
            {
                consumptionCode:"CON004",
                requestNo: "REQ004",
                date: "2023-08-04",
                buyer: "GHI Fashions",
                styleNo: "STL004",
                sampleIndentDate: "2023-08-05",
                poNumber:"PO004",

            },
            {
                consumptionCode:"CON005",
                requestNo: "REQ005",
                date: "2023-08-08",
                buyer: " Fashions",
                styleNo: "STL005",
                sampleIndentDate: "2023-08-05",
                poNumber:"PO005",

            },

            {
                consumptionCode:"CON006",
                requestNo: "REQ006",
                date: "2023-08-06",
                buyer: "XYZ Fashion",
                styleNo: "STL006",
                sampleIndentDate: "2023-08-09",
                poNumber:"PO006",

            },

            {
                consumptionCode:"CON007",
                requestNo: "REQ007",
                date: "2023-08-10",
                buyer: "Style Fashion",
                styleNo: "STL007",
                sampleIndentDate: "2023-08-10",
                poNumber:"PO007",

            },

            {
                consumptionCode:"CON008",
                requestNo: "REQ008",
                date: "2023-08-01",
                buyer: "quba Fashion",
                styleNo: "STL008",
                sampleIndentDate: "2023-08-01",
                poNumber:"PO008",

            },

            {
                consumptionCode:"CON009",
                requestNo: "REQ009",
                date: "2023-08-04",
                buyer: "styling",
                styleNo: "STL009",
                sampleIndentDate: "2023-08-05",
                poNumber:"PO009",

            },

            {
                consumptionCode:"CON0010",
                requestNo: "REQ0010",
                date: "2023-08-04",
                buyer: "GHI Fashions",
                styleNo: "STL0010",
                sampleIndentDate: "2023-08-05",
                poNumber:"PO0010",

            },


        ];

        return dummyData
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