import { GlobalResponseObject } from "../global-response-object";
import { SizeDto } from "./sizes-dto";

export class SizeResponseModel extends GlobalResponseObject {
    data?: SizeDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: SizeDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}