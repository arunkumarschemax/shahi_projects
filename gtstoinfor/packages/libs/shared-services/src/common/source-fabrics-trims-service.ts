import axios from 'axios';
import { CommonAxiosService } from "../common-axios-service-prs";
import { MaterialIssueIdreq } from '@project-management-system/shared-models';

export class SourceFabricsTrimsService extends CommonAxiosService {

    materialIssueController = "/material-issue";

    async getMaterialIssueDetailsById(req:MaterialIssueIdreq) {
        return this.axiosPostCall(this.materialIssueController + "/getMaterialIssueDetailsById", req);
    }

    async getAllFabricDetails(req:MaterialIssueIdreq) {
        return this.axiosPostCall(this.materialIssueController + "/getAllFabricDetails", req);
    }

    async getAllTrimDetails(req:MaterialIssueIdreq) {
        return this.axiosPostCall(this.materialIssueController + "/getAllTrimDetails", req);
    }



    async getAllFabrics(): Promise<any> {
        const dummyData = [
            {
                fabricCode: "Fab001",
                description: "Description",
                color: "Brown",
                consumption: "1kg",
                issuedQty: "4kgs",
            },
            {
                fabricCode: "Fab002",
                description: "Description",
                color: "Black",
                consumption: "1/2kg",
                issuedQty: "2kgs",
            },
            {
                fabricCode: "Fab003",
                description: "Description",
                color: "Pink",
                consumption: "1kg",
                issuedQty: "3kgs",
            },
            {
                fabricCode: "Fab004",
                description: "Description",
                color: "Black",
                consumption: "2ks",
                issuedQty: "5kgs",
            },
        ]
        return dummyData

    }



    async getAllTrims(): Promise<any> {
        const dummyData = [
            {
                trimCode: "T001",
                description: "Description",
                color: "Brown",
                consumption: "1kg",
                issuedQty: "4kgs",
            },
            {
                trimCode: "T002",
                description: "Description",
                color: "Black",
                consumption: "1kg",
                issuedQty: "3kgs",
            },
            {
                trimCode: "T003",
                description: "Description",
                color: "Pink",
                consumption: "1kg",
                issuedQty: "3kgs",
            },
            {
                trimCode: "T004",
                description: "Description",
                color: "Black",
                consumption: "2kgs",
                issuedQty: "5kgs",
            },
        ]
        return dummyData

    }
    async getSourceIssueByID(): Promise<any> {
        const dummyData = [
            {
                id: "1",
                requestNo: "REQ001",
                date: "2023-08-01",
                location: "A1F1",
                pch: "PCH001",
                user: "Proto",
                buyer: "Suresh",
                styleNo: "STL001",
                sampleType: "T-Shirt",
                sampleSubType: "T-Shirt",
                consumptionCode: "CON007",
                issuingdate: "2023-08-10",
                sampleIndentDate: "2023-08-10",
                poNumber: "PO007",
                style: "Casual",
                description: "Plain white cotton t-shirt",
                brand: "Nike",
                costRef: "TC001",
                m3StyleNo: "12345",
                contactNo: "8885556666",
                extn: "123",
                sam: "4.5",
                dmm: "Rajesh",
                product: "product",
                technician: "Suresh",
                productType: "Apparel",
                Conversion: "INR",
                madeIn: "USA",
                remarks: "Sample for approval",
            }
        ]
        return dummyData
    }
}
