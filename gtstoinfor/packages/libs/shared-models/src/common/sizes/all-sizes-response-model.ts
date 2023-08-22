import { SizeDto } from "./sizes-dto";
import { GlobalResponseObject } from "../global-response-object";


export class AllSizeResponseModel extends GlobalResponseObject{
    data?: SizeDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: SizeDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }




}