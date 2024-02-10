
import { AllLocationResponseModel, AllLocationsResponseModel, LocationsRequest, MasterLocationsDto, MasterLocationsResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class MasterLocationsService extends CommonAxiosService{
  URL = "/master-locations";

  async createlocation(location: MasterLocationsDto): Promise<MasterLocationsResponseModel> {
    return this.axiosPostCall(this.URL + "/createMasterlocation", location)
}

  async updatelocation(location: MasterLocationsDto): Promise<MasterLocationsResponseModel> {
    return this.axiosPostCall(this.URL + "/updatelocations", location)
  }
  async getAlllocations(req?:any): Promise<AllLocationsResponseModel> {
    return this.axiosPostCall(this.URL + '/getAlllocations',req)
  }

  // async ActivateDeActivatelocation(location: MasterLocationsDto): Promise<MasterLocationsResponseModel> {
  //   console.log(location,'shared-----------')
  //   return this.axiosPostCall(this.URL + '/activateOrDeactivatelocation', location)

  // }
  async getAllActivelocations(): Promise<AllLocationsResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActivelocations')
  }
  async getlocationById(locationRequest:LocationsRequest): Promise<MasterLocationsResponseModel> {
    return this.axiosPostCall(this.URL + '/getActivelocationsById',locationRequest)
  }

  async ActivateDeActivatelocation(locationReq: MasterLocationsDto): Promise<MasterLocationsResponseModel> {
    console.log(locationReq,'shared-----------')
    return  this.axiosPostCall(this.URL + '/activateOrDeactivatelocation', locationReq)
}
}
