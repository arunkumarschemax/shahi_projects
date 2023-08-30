import { GlobalResponseObject } from "../global-response-object";
import { SampleTypesDto } from "./sample-types.dto";


export class AllSampleTypesResponseModel extends GlobalResponseObject {
    data?: SampleTypesDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: SampleTypesDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}
