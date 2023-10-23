import { ItemGroupDto } from "./item-group.dto";
import { GlobalResponseObject } from "../global-response-object";


export class AllItemGroupResponseModel extends GlobalResponseObject{
    data?: ItemGroupDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ItemGroupDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }




}