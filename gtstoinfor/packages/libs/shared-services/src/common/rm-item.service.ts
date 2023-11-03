import { RmCreationDTO,CommonResponseModel } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class RmCreationService extends CommonAxiosService{
  URL = "/rm-creat";

  async createRm(req: RmCreationDTO): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/createRm", req)
}

 
}