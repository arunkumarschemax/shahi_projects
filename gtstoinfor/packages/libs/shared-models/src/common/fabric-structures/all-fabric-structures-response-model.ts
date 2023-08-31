import { GlobalResponseObject } from "../global-response-object";
import { FabricStructuresDTO } from "./fabric-structures.dto";


export class AllFabricStructuresResponseModel extends GlobalResponseObject {
    data?: FabricStructuresDTO[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: FabricStructuresDTO[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

