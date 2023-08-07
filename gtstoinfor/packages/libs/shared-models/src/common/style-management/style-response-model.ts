import { GlobalResponseObject } from "../global-response-object";
import { StyleDto } from "./stye-dto";


export class AllStyleResponseModel extends GlobalResponseObject {
    data: StyleDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data: StyleDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

