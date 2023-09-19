import { GlobalResponseObject } from "../global-response-object";
import { PriceListDto } from "./pricelist.dto";
import { PriceListModel } from "./pricelist.model";

export class PriceListResponseModel extends GlobalResponseObject {
    data? : PriceListModel[];
     /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //DepartmentDto
     */

     constructor(status: boolean, errorCode: number, internalMessage: string, data?: PriceListModel[]){
        super(status, errorCode, internalMessage);
        this.data = data;
     }

}