import { GlobalResponseObject } from "../global-response-object";
import { SourcingRequisitionModel } from "./sourcing-requisition-model";

export class SourcingRequisitionResponse extends GlobalResponseObject {
    data: SourcingRequisitionModel;
    /**
    * 
    * @param status 
    * @param errorCode 
    * @param internalMessage 
    * @param data 
    */
    constructor(status: boolean, errorCode: number, internalMessage: string, data: SourcingRequisitionModel) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}