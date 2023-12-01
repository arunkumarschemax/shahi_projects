import { CommonResponseModel, ReclassificationApproveRequestDto, ReclassificationDto } from '@project-management-system/shared-models';
import { CommonAxiosService } from '../common-axios-service-prs';

export class ReclassificationService  extends CommonAxiosService{
URL ='/reclassification';

    async createReclassification(dto: ReclassificationDto): Promise<CommonResponseModel> {
        console.log(dto)
        return this.axiosPostCall(this.URL + '/createReclassification',dto)   
    }
     async getAllReclassificationData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllReclassificationData')   
     }
    async getApproveStockReclassification(req:ReclassificationApproveRequestDto): Promise<CommonResponseModel> {
        console.log(req);
        return this.axiosPostCall(this.URL + '/getApproveStockReclassification',req)   
     }

}