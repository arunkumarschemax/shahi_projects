import { FabricDevelopmentRequestModel } from "@project-management-system/shared-models";
import { GlobalResponseObject } from "../global-response-object";

export class FabricDevelopmentRequestResponse extends GlobalResponseObject {
    data?:FabricDevelopmentRequestModel
    /**
    * 
    * @param status 
    * @param errorCode 
    * @param internalMessage 
    * @param data 
    */
    constructor(status: boolean, errorCode: number, internalMessage: string, data?:FabricDevelopmentRequestModel) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }

}