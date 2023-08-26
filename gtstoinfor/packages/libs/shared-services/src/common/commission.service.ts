import axios from 'axios';
import { DeliveryMethodDto, DeliveryMethodRequest } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllCommissionResponseModel, CommissionRequest, CommissionDto, CommissionResponseModel } from '@project-management-system/shared-models';


export class CommissionService extends CommonAxiosService{
URL = '/commission';

        async createCommission(req: CommissionDto): Promise<CommissionResponseModel> {
            return this.axiosPostCall(this.URL +  '/createCommission',req)
                
        }

        async  updateCommission(req: CommissionDto): Promise<CommissionResponseModel> {
            return this.axiosPostCall(this.URL + '/updateCommission', req)
        }
        
        async getAllCommissions(): Promise<AllCommissionResponseModel> {
            return this.axiosPostCall(this.URL + "/getAllCommissions")
        }
        
        async  activateOrDeactivateCommission(req: CommissionRequest): Promise<CommissionResponseModel> {
            return this.axiosPostCall(this.URL + '/activateOrDeactivateCommission', req)
        }
        
        async  getAllActiveCommission(): Promise<AllCommissionResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveCommission')
        }
        
        async getActiveCommissionById(req : CommissionRequest): Promise<CommissionResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveCommissionById',req)
        }
        

}