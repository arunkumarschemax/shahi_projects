import {
    AllDeliveryTermsResponseModel,
    AllFabricFinishTypesResponseModel,
    AllFabricStructuresResponseModel,
    DeliveryTermsDropDownResponseModel,
    FabricFinishTypeIdRequest,
    FabricFinishTypesDTO,
    FabricStructuresRequest,
  } from "@project-management-system/shared-models";
  import axios from "axios";
  import { CommonAxiosService } from "../common-axios-service-prs";
  
  export class FabricFinishTypeService extends CommonAxiosService{
      URL = "/fabric-finish-types";
  
  //   async create(dto: FabricFinishTypesDTO): Promise<DeliveryTermsResponseModel> {
  //     console.log(dto);
  
  //     return await axios
  //       .post(this.URL + "/createDeliveryTerms", dto)
  //       .then((res) => {
  //         return res.data;
  //       });
  //   }
    async create(dto: FabricFinishTypesDTO): Promise<AllFabricFinishTypesResponseModel> {
      return this.axiosPostCall(this.URL + "/createFabricFinishTypes",dto)
  }
    async update(dto: FabricFinishTypesDTO): Promise<AllFabricFinishTypesResponseModel> {
      return this.axiosPostCall(this.URL + "/updateFabricFinishType", dto)
        
    }
  
    async activateOrDeactivateFabricFinishTypes(Dto: FabricFinishTypesDTO): Promise<AllFabricStructuresResponseModel> {
      //   console.log(State.stateCode);
      return this.axiosPostCall(this.URL + "/activateOrDeactivateFabricFinishTypes", Dto)
        
    }
  
    // async getAll(req:UserRequestDto): Promise<AllAllFabricStructuresResponseModel> {
    async getAll(): Promise<AllFabricFinishTypesResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllFabricFinishType")
    }
  
    async getActiveFabricFinishTypesById(Request: FabricFinishTypeIdRequest): Promise<AllFabricFinishTypesResponseModel> {
      console.log(this.URL);
      return this.axiosPostCall(this.URL + "/getActiveFabricFinishTypesById", Request)
        
    }
  
    async getAllActiveFabricFinishType(): Promise<AllFabricStructuresResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveFabricFinishType")
    }
  }
  