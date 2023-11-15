import { GlobalResponseObject } from "../global-response-object";
import { GrnDto } from "./grn-dto";


export class GRNResponseModel extends GlobalResponseObject{
    data?: GrnDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: GrnDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}