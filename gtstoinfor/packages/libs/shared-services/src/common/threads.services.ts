import { CommonAxiosService } from '../common-axios-service-prs';
import { AllThreadsResponseModel,ThreadsDto,ThreadsResponseModel } from '@project-management-system/shared-models';
export class ThreadService extends CommonAxiosService{
  private URL = "/threads";

  async createThread(items:ThreadsDto ): Promise<ThreadsResponseModel> {
     console.log('at fe service ',items)
    return this.axiosPostCall(this.URL + "/createThread", items)
}

  async updatethread(items: ThreadsDto): Promise<ThreadsResponseModel> {
    return this.axiosPostCall(this.URL + "/updatethread", items)
  }
  async getAllThread(): Promise<AllThreadsResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllThread')
  }

//   async activateOrDeactivateItems( items: ThreadsDto): Promise<ThreadsResponseModel> {
//     return this.axiosPostCall(this.URL + '/activateOrDeactivateItems', items)

//   }
//   async getAllActiveCurrencys(): Promise<AllThreadsResponseModel> {
//     return this.axiosPostCall(this.URL + '/getAllActiveCurrencies')
//   }
//   async getItemById(itemsRequest:ItemsRequest): Promise<ThreadsResponseModel> {
//     return this.axiosPostCall(this.URL + '/getById',itemsRequest)
//   }

}
