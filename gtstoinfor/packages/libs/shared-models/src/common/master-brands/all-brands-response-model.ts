import { GlobalResponseObject } from "../global-response-object";
import { MasterBrandsDto } from "./master-request";


export class AllBrandsResponseModel extends GlobalResponseObject {
    data?: MasterBrandsDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: MasterBrandsDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

