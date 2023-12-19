import axios from 'axios';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllFabricWeaveResponseModel, FabricWeaveRequest, FabricWeaveDto, FabricWeaveResponseModel, UploadResponse, CommonResponseModel, FabricTypeIdReq } from '@project-management-system/shared-models';


export class FabricWeaveService extends CommonAxiosService{
URL = '/fabric-weave';

        async createFabricWeave(req: FabricWeaveDto): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL +  '/createFabricWeave',req)
                
        }

        async  updateFabricWeave(req: FabricWeaveDto): Promise<FabricWeaveResponseModel> {
            return this.axiosPostCall(this.URL + '/updateFabricWeave', req)
        }
        
        async getAllFabricWeave(): Promise<AllFabricWeaveResponseModel> {
            return this.axiosPostCall(this.URL + "/getAllFabricWeave")
        }
        
        async  activateOrDeactivateFabricWeave(req: FabricWeaveRequest): Promise<FabricWeaveResponseModel> {
            return this.axiosPostCall(this.URL + '/activateOrDeactivateFabricWeave', req)
        }
        
        async  getAllActiveFabricWeave(): Promise<AllFabricWeaveResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveFabricWeave')
        }
        
        async getActiveFabricWeaveById(req : FabricWeaveRequest): Promise<FabricWeaveResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveFabricWeaveById',req)
        }

        async fabricWeaveImageUpload(file: any): Promise<UploadResponse> {
            return await this.axiosPostCall(this.URL + '/fileUpload', file);
        }

        async getWeaveByTypeId(req?: FabricTypeIdReq): Promise<UploadResponse> {
            return await this.axiosPostCall(this.URL + '/getWeaveByTypeId', req);
        }

}