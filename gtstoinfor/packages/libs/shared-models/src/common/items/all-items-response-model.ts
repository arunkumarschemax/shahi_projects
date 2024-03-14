import { GlobalResponseObject } from "../global-response-object";
import {  ItemsDto } from "./items-request";


export class AllItemsResponseModel extends GlobalResponseObject {
    data?: ItemsDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ItemsDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

