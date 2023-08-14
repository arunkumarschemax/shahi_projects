import { GlobalResponseObject } from "../global-response-object";
import { CustomGroupsDto } from "./custom-groups-dto";

export class CustomGroupsResponseModel extends GlobalResponseObject {
    data?: CustomGroupsDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: CustomGroupsDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

