import { GlobalResponseObject } from "../global-response-object";
import { M3FabricsDTO } from "@project-management-system/shared-models";


export class FabricRequestResponseModel extends GlobalResponseObject{
    data?: M3FabricsDTO[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: M3FabricsDTO[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}