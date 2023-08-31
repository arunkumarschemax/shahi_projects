import { GlobalResponseObject } from "../global-response-object";
import { FabricFinishTypesDTO } from "./fabric-finish-types.dto";


export class AllFabricFinishTypesResponseModel extends GlobalResponseObject {
    data?: FabricFinishTypesDTO[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: FabricFinishTypesDTO[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

