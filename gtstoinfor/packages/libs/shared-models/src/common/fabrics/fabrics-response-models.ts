import { FabricsDto } from "./fabrics-dto";
import { GlobalResponseObject } from "../global-response-object";


export class FabricsResponseModel extends GlobalResponseObject{
    data?: FabricsDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: FabricsDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}