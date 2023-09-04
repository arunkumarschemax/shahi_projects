import { BuyerDestinationInfoModel } from "./buyers-destination-info.model";
import { ColourInfoModel } from "./colour-info-model";
import { DestinationInfoModel } from "./destination-info-model";
import { MappedDetails } from "./mapped-details-model";
import { SizeInfoModel } from "./size-info-model";

export class MappingModel{
    buyerId: number;
    buyerName: string;
    size: SizeInfoModel[];
    destination: DestinationInfoModel[];
    color: ColourInfoModel[];

    constructor( buyerId:number,buyerName: string,size: SizeInfoModel[],destination: DestinationInfoModel[],color:ColourInfoModel[]){
       
        this.buyerId = buyerId
        this.buyerName = buyerName
        this.size = size
        this.destination = destination
        this.color = color
    }
}