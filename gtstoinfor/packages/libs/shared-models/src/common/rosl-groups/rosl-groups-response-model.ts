import { GlobalResponseObject } from "../global-response-object";
import { ROSLGroupsDto } from "./rosl-groups-dto";

export class ROSLGroupsResponseModel extends GlobalResponseObject {
    data?: ROSLGroupsDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ROSLGroupsDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

