import { GlobalResponseObject } from "../global-response-object";
import { FabricDevelopmentRequest } from "./fabric-development-request";

export class FabricDevelopmentRequestResponse extends GlobalResponseObject {
    data:FabricDevelopmentRequest[]
    /**
    * 
    * @param status 
    * @param errorCode 
    * @param internalMessage 
    * @param data 
    */
    constructor(status: boolean, errorCode: number, internalMessage: string, data:FabricDevelopmentRequest[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }

}