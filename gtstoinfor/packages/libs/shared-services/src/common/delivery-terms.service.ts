import {
  AllDeliveryTermsResponseModel,
  DeliveryTermsDropDownResponseModel,
  DeliveryTermsDto,
  DeliveryTermsRequest,
  DeliveryTermsResponseModel,
} from "@project-management-system/shared-models";
import axios from "axios";
import { CommonAxiosService } from "../common-axios-service-prs";

export class DeliveryTermsService extends CommonAxiosService{
    URL = "/deliveryterms";

//   async create(dto: DeliveryTermsDto): Promise<DeliveryTermsResponseModel> {
//     console.log(dto);

//     return await axios
//       .post(this.URL + "/createDeliveryTerms", dto)
//       .then((res) => {
//         return res.data;
//       });
//   }
  async create(dto: DeliveryTermsDto): Promise<DeliveryTermsResponseModel> {
    return this.axiosPostCall(this.URL + "/createDeliveryTerms",dto)
}
  async update(dto: DeliveryTermsDto): Promise<DeliveryTermsResponseModel> {
    return this.axiosPostCall(this.URL + "/updateDeliveryTerms", dto)
      
  }

  async activatedeActivate(Dto: DeliveryTermsDto): Promise<DeliveryTermsResponseModel> {
    //   console.log(State.stateCode);
    return this.axiosPostCall(this.URL + "/activateOrDeactivateDeliveryTerms", Dto)
      
  }

  // async getAll(req:UserRequestDto): Promise<AllDeliveryTermsResponseModel> {
  async getAll(): Promise<AllDeliveryTermsResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllDeliveryTerms")
  }

  async getAllDeliveryTermsDropDown(): Promise<DeliveryTermsDropDownResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllDeliveryTermsDropDown")
      
    // return new DeliveryTermsDropDownResponseModel(true,11,'customersData retrived successfully',[new DeliveryTermsDropDownDto(1,'Dterm1'),new DeliveryTermsDropDownDto(2,'Dterm2')])
  }
  async getDeliveryTermsById(deliveryTermsRequest: DeliveryTermsRequest): Promise<DeliveryTermsResponseModel> {
    console.log(this.URL);
    return this.axiosPostCall(this.URL + "/getDeliveryTermsById", deliveryTermsRequest)
      
  }
}
