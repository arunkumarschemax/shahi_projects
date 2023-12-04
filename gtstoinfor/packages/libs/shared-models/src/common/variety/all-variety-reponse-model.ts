
import { GlobalResponseObject } from "../global-response-object";
import { VarietyDtos } from "./variety-dto";
export class AllVarietysResponseModel extends GlobalResponseObject{
    data?: VarietyDtos[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: VarietyDtos[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }




}