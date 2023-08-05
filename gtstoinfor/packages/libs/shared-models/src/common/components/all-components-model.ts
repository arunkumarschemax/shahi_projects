import { GlobalResponseObject } from "../global-response-object";
import { ComponentsDto } from "./components-dto";




export class AllComponentsResponseModel extends GlobalResponseObject {
    data?: ComponentsDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ComponentsDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

