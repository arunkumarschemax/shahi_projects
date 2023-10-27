import axios from 'axios';
import { DeliveryMethodDto, DeliveryMethodRequest } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllCommissionResponseModel, CommissionRequest, CommissionDto, CommissionResponseModel, CompositionResponse, CompositionDto } from '@project-management-system/shared-models';


export class CompositionService extends CommonAxiosService{
URL = '/composition';

        async createComposition(req: CompositionDto): Promise<CompositionResponse> {
            return this.axiosPostCall(this.URL +  '/createComposition',req)
                
        }

        async  updateComposition(req: CompositionDto): Promise<CompositionResponse> {
            return this.axiosPostCall(this.URL + '/updateComposition', req)
        }
        
        async getCompositionData(): Promise<CompositionResponse> {
            return this.axiosPostCall(this.URL + "/getCompositionData")
        }
        
        async  activateOrDeactivateComposition(req: CompositionDto): Promise<CompositionResponse> {
            return this.axiosPostCall(this.URL + '/activateOrDeactivateComposition', req)
        }
        
        async  getActiveComposition(): Promise<CompositionResponse> {
            return this.axiosPostCall(this.URL + '/getActiveComposition')
        }
        
        

}