import { GlobalResponseObject } from "../global-response-object";
import { StocksDto } from "./stocks.dto";

export class StocksResponseModel extends GlobalResponseObject {
    data?: StocksDto;
    /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //StocksDto
     */

    constructor(status: boolean, errorCode: number, internalMessage: string, data?: StocksDto) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }

}