import { GlobalResponseObject } from "../global-response-object";
import { StocksDto } from "./stocks.dto";

export class AllStocksResponseModel extends GlobalResponseObject {
    data?: StocksDto[];
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //DepartmentDto
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: StocksDto[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }

}