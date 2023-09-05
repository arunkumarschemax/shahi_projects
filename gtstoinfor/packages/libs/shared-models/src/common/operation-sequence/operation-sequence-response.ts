    import { GlobalResponseObject } from "../global-response-object";
import { OperationSequenceModel } from "./operation-sequence.model";


export class OperationSequenceResponse extends GlobalResponseObject {
    data?: OperationSequenceModel[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: OperationSequenceModel[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}
