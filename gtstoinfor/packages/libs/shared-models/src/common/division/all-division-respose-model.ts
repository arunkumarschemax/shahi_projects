import { GlobalResponseObject } from "../global-response-object";
import { DivisionDto } from "./division-request";



export class AllDivisionResponseModel extends GlobalResponseObject {
    data?: DivisionDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: DivisionDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

