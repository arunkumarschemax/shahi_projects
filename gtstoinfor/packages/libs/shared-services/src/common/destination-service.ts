import { AllDestinationResponseModel, DestinationDropDownResponse, DestinationDto, DestinationRequest, DestinationResponseModel, DivisionRequest } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class DestinationService extends CommonAxiosService{
  URL = "/destination";

  async createDestination(destination: DestinationDto): Promise<DestinationResponseModel> {
    // console.log('testss',destination)
    return this.axiosPostCall(this.URL + "/createDestination", destination)
}

  async updateDestination(destination: DestinationDto): Promise<DestinationResponseModel> {
    return this.axiosPostCall(this.URL + "/updateDestination", destination)
  }
  async getAllDestination(req?:any): Promise<AllDestinationResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllDestination',req)
  }

  async ActivatedeActivateDestination(
    destinationDto: DestinationDto
  ): Promise<DestinationResponseModel> {
    return this.axiosPostCall(this.URL + '/activateOrDeactivateDestination', destinationDto)

  }
  async getAllActiveDestination(): Promise<AllDestinationResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveDestination')
  }
  async getDestinationById(destinationRequest:DestinationRequest): Promise<DestinationResponseModel> {
    return this.axiosPostCall(this.URL + '/getDestinationById',destinationRequest)
  }
  async getActiveDestinationCount(): Promise<AllDestinationResponseModel> {
    return this.axiosPostCall(this.URL + '/getActiveDestinationCount')
  }
  async getDestinationforDivisionDropDown(req:DivisionRequest): Promise<DestinationDropDownResponse> {
    return this.axiosPostCall(this.URL + '/getDestinationforDivisionDropDown',req)

}
}
