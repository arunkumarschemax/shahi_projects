
import { GlobalResponseObject } from "../global-response-object";
import { TrimDtos } from "./trim-dto";
export class AllTrimResponseModel extends GlobalResponseObject{
    data?: TrimDtos[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: TrimDtos[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }




}