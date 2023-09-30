import { GlobalResponseObject } from "../global-response-object";

export class FabricDevelopmentRequestResponse extends GlobalResponseObject {
    data
    /**
    * 
    * @param status 
    * @param errorCode 
    * @param internalMessage 
    * @param data 
    */
    constructor(status: boolean, errorCode: number, internalMessage: string, data) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }

}