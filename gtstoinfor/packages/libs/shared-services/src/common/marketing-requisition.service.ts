import axios from 'axios';
import { DeliveryMethodDto, DeliveryMethodRequest } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllMarketingRequisitionResponseModel, MarketingRequisitionRequest, MarketingRequisitionDto, MarketingRequisitionResponseModel } from '@project-management-system/shared-models';


export class MarketingReqService extends CommonAxiosService{
URL = '/marketing-requisition';

        async createMarketingReqGroup(req: MarketingRequisitionDto): Promise<MarketingRequisitionResponseModel> {
            return this.axiosPostCall(this.URL +  '/createMarketingReqGroup',req)
                
        }

        async  updateMarketingReq(req: MarketingRequisitionDto): Promise<MarketingRequisitionResponseModel> {
            return this.axiosPostCall(this.URL + '/updateMarketingReq', req)
        }
        
        async getAllMarketingReq(): Promise<any> {
            const data =[
                {
                    trimType: "Button",
                    trimCode: "BTN001",
                    description: "Metallic Gold Button",
                    size: 12,
                    color: "Gold",
                    quantity: 100,
                    remarks: "Shiny finish",
                    status: "OPEN"
                  },
                  {
                    trimType: "Zipper",
                    trimCode: "ZIP002",
                    description: "Nylon Zipper",
                    size: 8,
                    color: "Black",
                    quantity: 50,
                    remarks: "Water-resistant",
                    status: "CLOSED"
                  },
                  {
                    trimType: "Thread",
                    trimCode: "THR003",
                    description: "Cotton Sewing Thread",
                    size: 40,
                    color: "White",
                    quantity: 200,
                    remarks: "Strong and durable",
                    status: "OPEN"
                  },
                  {
                    trimType: "Fabric",
                    trimCode: "FAB004",
                    description: "Cotton Blend Fabric",
                    size: 2.5, // Measured in meters
                    color: "Blue",
                    quantity: 30,
                    remarks: "Soft and breathable",
                    status: "INPROGRESS"
                  },
            ];
            return data
            // return this.axiosPostCall(this.URL + "/getAllMarketingReq")
        }
        
        async  activateOrDeactivate(req: MarketingRequisitionRequest): Promise<MarketingRequisitionResponseModel> {
            return this.axiosPostCall(this.URL + '/activateOrDeactivate', req)
        }
        
        async  getAllActive(): Promise<AllMarketingRequisitionResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActive')
        }
        
        async getActiveById(req : MarketingRequisitionRequest): Promise<MarketingRequisitionResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveById',req)
        }
        

}