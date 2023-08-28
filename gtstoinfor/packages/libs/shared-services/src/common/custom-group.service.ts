import axios from 'axios';
import { DeliveryMethodDto, DeliveryMethodRequest } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllCustomGroupsResponseModel, CustomGroupRequest, CustomGroupsDto, CustomGroupsResponseModel } from '@project-management-system/shared-models';


export class CustomGroupsService extends CommonAxiosService{
URL = '/custom-groups';

        async createCustomGroup(req: CustomGroupsDto): Promise<CustomGroupsResponseModel> {
            return this.axiosPostCall(this.URL +  '/createCustomGroup',req)
                
        }

        async  updateCustomGroup(req: CustomGroupsDto): Promise<CustomGroupsResponseModel> {
            return this.axiosPostCall(this.URL + '/updateCustomGroup', req)
        }
        
        async getAllCustomGroups(): Promise<AllCustomGroupsResponseModel> {
            return this.axiosPostCall(this.URL + "/getAllCustomGroups")
        }
        
        async  activateOrDeactivateCustomGroup(req: CustomGroupRequest): Promise<CustomGroupsResponseModel> {
            return this.axiosPostCall(this.URL + '/activateOrDeactivateCustomGroup', req)
        }
        
        async  getAllActiveCustomGroups(): Promise<AllCustomGroupsResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveCustomGroups')
        }
        
        async getActiveCustomGroupById(req : CustomGroupRequest): Promise<CustomGroupsResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveCustomGroupById',req)
        }
        
        async getActiveDeliveryMethodsCount(): Promise<AllCustomGroupsResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveDeliveryMethodsCount').then(res => {
                return res.data
            })
        }

}