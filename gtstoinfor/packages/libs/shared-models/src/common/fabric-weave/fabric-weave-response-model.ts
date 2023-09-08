import { GlobalResponseObject } from "../global-response-object";
import { FabricWeaveDto } from "./fabric-weave-dto";

export class FabricWeaveResponseModel extends GlobalResponseObject {
    data?: FabricWeaveDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: FabricWeaveDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}

