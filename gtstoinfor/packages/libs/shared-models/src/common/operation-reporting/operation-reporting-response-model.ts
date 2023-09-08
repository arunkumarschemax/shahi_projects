import { GlobalResponseObject } from "../global-response-object";
import { OperationReportingModel } from "./operation-reporting-model";


export class OperationReportingResponseModel extends GlobalResponseObject {
    data?: OperationReportingModel[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: OperationReportingModel[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}