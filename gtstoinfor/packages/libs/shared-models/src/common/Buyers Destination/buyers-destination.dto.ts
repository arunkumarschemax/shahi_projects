import { MappedDetails } from "./mapped-details-model";
import { MappingResponseModel } from "./response-model";

export class BuyersDestinationDto{
    BsId: number;
    buyerId : number;
    isActive: boolean;
   createdUser : string;
  
    updatedUser : string;
  
    versionFlag : number;

  mappingDetails: MappedDetails[]

  constructor(BsId: number,buyerId : number,isActive: boolean,createdUser : string,updatedUser : string,versionFlag : number, mappingDetails: MappedDetails[]){
    this.BsId = BsId
    this.buyerId = buyerId
    this.createdUser=createdUser
    this.isActive=isActive
    this.updatedUser = updatedUser
    this.versionFlag = versionFlag
    this.mappingDetails = mappingDetails
  }
}