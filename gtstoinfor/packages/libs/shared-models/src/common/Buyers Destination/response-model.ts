import { BuyerDestinationInfoModel } from "./buyers-destination-info.model";
import { ColourInfoModel } from "./colour-info-model";
import { DestinationInfoModel } from "./destination-info-model";
import { MappedDetails } from "./mapped-details-model";
import { SizeInfoModel } from "./size-info-model";

export class MappingResponseModel{
    BsId: number;
    buyerId: number;
    createdUser: string;
    updatedUser: string;
    isActive: boolean
    versionFlag: number;
    mappedDetails: MappedDetails[]

    constructor(BsId: number, buyerId:number,createdUser: string,updatedUser: string,isActive: boolean,versionFlag: number,mappedDetails: MappedDetails[]){
        this.BsId = BsId;
       this.createdUser = createdUser
        this.updatedUser = updatedUser
        this.isActive = isActive
        this.versionFlag = versionFlag
        this.buyerId = buyerId
        this.mappedDetails = mappedDetails
    }
}