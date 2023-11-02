import axios from 'axios';
import { DeliveryMethodDto, DeliveryMethodRequest } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllCommissionResponseModel, CommissionRequest, CommissionDto, CommissionResponseModel, CompositionResponse, CompositionDto, RangeResponse, RangeDto } from '@project-management-system/shared-models';


export class RangeService extends CommonAxiosService{
URL = '/range';

        async createRange(req: RangeDto): Promise<RangeResponse> {
            return this.axiosPostCall(this.URL +  '/createRange',req)
                
        }

        async  updateRange(req: RangeDto): Promise<RangeResponse> {
            // console.log(req,"reqqqqq")
            return this.axiosPostCall(this.URL + '/createRange', req)
        }
        
        async getRangeData(): Promise<RangeResponse> {
            return this.axiosPostCall(this.URL + "/getRangeData")
        }
        
        async  ActivateOrDeactivateRange(req: RangeDto): Promise<RangeResponse> {
            return this.axiosPostCall(this.URL + '/ActivateOrDeactivateRange', req)
        }
        
        async  getActiveRange(): Promise<RangeResponse> {
            return this.axiosPostCall(this.URL + '/getActiveRange')
        }
        
        

}