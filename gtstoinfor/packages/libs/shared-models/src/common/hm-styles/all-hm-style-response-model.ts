import { GlobalResponseObject } from "../global-response-object";
import { HMStylesModelDto } from "./hm-style-request";



export class AllHMStyleResponseModel extends GlobalResponseObject {
    data?: HMStylesModelDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: HMStylesModelDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

