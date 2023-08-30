import { GlobalResponseObject } from "../global-response-object";
import { ColourDto } from "./colour-dto";

export class AllColourResponseModel extends GlobalResponseObject{
    data?: ColourDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ColourDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }




}