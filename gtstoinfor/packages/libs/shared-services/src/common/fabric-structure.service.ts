import {
    AllDeliveryTermsResponseModel,
    AllFabricStructuresResponseModel,
    DeliveryTermsDropDownResponseModel,
    FabricStructuresDTO,
    FabricStructuresRequest,
  } from "@project-management-system/shared-models";
  import axios from "axios";
  import { CommonAxiosService } from "../common-axios-service-prs";
  
  export class FabricStructuresService extends CommonAxiosService{
      URL = "/fabric-structure";
  
  //   async create(dto: FabricStructuresDTO): Promise<DeliveryTermsResponseModel> {
  //     console.log(dto);
  
  //     return await axios
  //       .post(this.URL + "/createDeliveryTerms", dto)
  //       .then((res) => {
  //         return res.data;
  //       });
  //   }
    async create(dto: FabricStructuresDTO): Promise<AllFabricStructuresResponseModel> {
      return this.axiosPostCall(this.URL + "/createFabricStructure",dto)
  }
    async update(dto: FabricStructuresDTO): Promise<AllFabricStructuresResponseModel> {
      return this.axiosPostCall(this.URL + "/updateFabricStructure", dto)
        
    }
  
    async activateOrDeactivateFabricStructure(Dto: FabricStructuresDTO): Promise<AllFabricStructuresResponseModel> {
      //   console.log(State.stateCode);
      return this.axiosPostCall(this.URL + "/activateOrDeactivateFabricStructure", Dto)
        
    }
  
    // async getAll(req:UserRequestDto): Promise<AllAllFabricStructuresResponseModel> {
    async getAll(): Promise<AllFabricStructuresResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllFabricStructures")
    }
  
    async getActiveFabricStructureById(Request: FabricStructuresRequest): Promise<AllFabricStructuresResponseModel> {
      console.log(this.URL);
      return this.axiosPostCall(this.URL + "/getActiveFabricStructureById", Request)
        
    }
  
    async getAllActiveFabricStructures(): Promise<AllFabricStructuresResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveFabricStructures")
    }
  }
  