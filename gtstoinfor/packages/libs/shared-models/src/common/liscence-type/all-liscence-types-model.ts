import { GlobalResponseObject } from "../global-response-object";
import { LiscenceTypesdDto } from "./liscence-type-dto";




export class AllLiscenceResponseModel extends GlobalResponseObject {
    data?: LiscenceTypesdDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: LiscenceTypesdDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

