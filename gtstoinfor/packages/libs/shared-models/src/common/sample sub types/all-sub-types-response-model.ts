import { GlobalResponseObject } from "../global-response-object";
import { SampleSubTypesDTO } from "./sample-sub-types.dto";


export class AllSampleSubTypesResponseModel extends GlobalResponseObject {
    data?: SampleSubTypesDTO[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: SampleSubTypesDTO[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

