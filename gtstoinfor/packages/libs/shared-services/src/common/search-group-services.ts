import { SearchGrpResponse, searchGroupDto } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class SearchGroupService extends CommonAxiosService{
  URL = "/searchGroup";

  async createSearchGroup(Dto: searchGroupDto): Promise<SearchGrpResponse> {
    return this.axiosPostCall(this.URL + "/createSearchGroup", Dto)
}

  async UpdateSearchGroup(Dto: searchGroupDto): Promise<SearchGrpResponse> {
    return this.axiosPostCall(this.URL + "/UpdateSearchGroup", Dto)
  }
  async getSearchGroupData(req?:any): Promise<SearchGrpResponse> {
    return this.axiosPostCall(this.URL + '/getSearchGroupData',req)
  }

  async ActivateOrDeactivate(Dto: searchGroupDto): Promise<SearchGrpResponse> {
    return this.axiosPostCall(this.URL + '/ActivateOrDeactivate', Dto)

  }
  async getActiveSearchGroup(): Promise<SearchGrpResponse> {
    return this.axiosPostCall(this.URL + '/getActiveSearchGroup')
  }
  
  
}
