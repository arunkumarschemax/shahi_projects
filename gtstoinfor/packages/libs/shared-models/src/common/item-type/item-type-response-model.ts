import { GlobalResponseObject } from "../global-response-object";
import { ItemTypeDto } from "./item-type.dto";

export class ItemTypeResponseModel extends GlobalResponseObject {
    data?: ItemTypeDto[];
    isActive: any;
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ItemTypeDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}