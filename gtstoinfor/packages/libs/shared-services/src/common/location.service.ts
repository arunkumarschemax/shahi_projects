
  import axios from "axios";
  import { CommonAxiosService } from "../common-axios-service-prs";
import { AllLocationResponseModel, LocationDropDownResponseModel, LocationDto, LocationRequest, LocationResponseModel } from "@project-management-system/shared-models";
  
  export class LocationsService extends CommonAxiosService{
      URL = "/location";
  
  //   async create(dto: LocationDto): Promise<LocationResponseModel> {
  //     console.log(dto);
  
  //     return await axios
  //       .post(this.URL + "/createDeliveryTerms", dto)
  //       .then((res) => {
  //         return res.data;
  //       });
  //   }
    async create(dto: LocationDto): Promise<LocationResponseModel> {
      return this.axiosPostCall(this.URL + "/createLocation",dto)
  }
    async update(dto: LocationDto): Promise<LocationResponseModel> {
      return this.axiosPostCall(this.URL + "/updateLocation", dto)
        
    }
  
    async activatedeActivate(Dto: LocationDto): Promise<LocationResponseModel> {
      //   console.log(State.stateCode);
      return this.axiosPostCall(this.URL + "/activateOrDeactivateLocations", Dto)
        
    }
  
    // async getAll(req:UserRequestDto): Promise<AllLocationResponseModel> {
    async getAll(): Promise<AllLocationResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllLocations")
    }
  
    async getAllLocationDropDown(): Promise<LocationDropDownResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllLocationsDropDown")
        
      // return new DeliveryTermsDropDownResponseModel(true,11,'customersData retrived successfully',[new DeliveryTermsDropDownDto(1,'Dterm1'),new DeliveryTermsDropDownDto(2,'Dterm2')])
    }
    async getLocationById(Request: LocationRequest): Promise<LocationResponseModel> {
      console.log(this.URL);
      return this.axiosPostCall(this.URL + "/getlocationById", Request)
        
    }

    async getAllActiveLocations(): Promise<AllLocationResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveLocations")
    }
  
  }
  