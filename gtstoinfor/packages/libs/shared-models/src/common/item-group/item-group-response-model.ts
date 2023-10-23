import { GlobalResponseObject } from "../global-response-object";
import { ItemGroupDto } from "./item-group.dto";

export class ItemGroupResponseModel extends GlobalResponseObject {
    data?: ItemGroupDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ItemGroupDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}