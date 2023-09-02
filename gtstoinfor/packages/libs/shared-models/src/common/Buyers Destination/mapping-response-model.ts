import { GlobalResponseObject } from "../global-response-object";
import { MappingModel } from "./mapping-info-model";
import { MappingResponseModel } from "./response-model";

export class BuyersMappingResponseModel extends GlobalResponseObject{
    data?: MappingModel[];
    buyerDetails: any;
  
     constructor(status: boolean, intlCode: number, internalMessage: string, data?: MappingModel[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }    
}