import axios from 'axios';
import { DeliveryMethodDto, DeliveryMethodRequest } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllROSLGroupsResponseModel, ROSLGroupRequest, ROSLGroupsDto, ROSLGroupsResponseModel } from '@project-management-system/shared-models';


export class ROSLGroupsService extends CommonAxiosService{
URL = '/rosl-groups';

        async createROSLGroup(req: ROSLGroupsDto): Promise<ROSLGroupsResponseModel> {
            return this.axiosPostCall(this.URL +  '/createROSLGroup',req)
                
        }

        async  updateROSLGroup(req: ROSLGroupsDto): Promise<ROSLGroupsResponseModel> {
            return this.axiosPostCall(this.URL + '/updateROSLGroup', req)
        }
        
        async getAllROSLGroups(): Promise<AllROSLGroupsResponseModel> {
            return this.axiosPostCall(this.URL + "/getAllROSLGroups")
        }
        
        async  activateOrDeactivateROSLGroup(req: ROSLGroupRequest): Promise<ROSLGroupsResponseModel> {
            return this.axiosPostCall(this.URL + '/activateOrDeactivateROSLGroup', req)
        }
        
        async  getAllActiveROSLGroups(): Promise<AllROSLGroupsResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveROSLGroups')
        }
        
        async getActiveROSLGroupById(req : ROSLGroupRequest): Promise<ROSLGroupsResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveROSLGroupById',req)
        }
        

}