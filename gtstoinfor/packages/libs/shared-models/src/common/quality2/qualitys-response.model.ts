import { QualitysDTO } from "./qualitys.dto";
import { GlobalResponseObject } from "../global-response-object";


export class qualitysResponseModel extends GlobalResponseObject{
    data?: QualitysDTO[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: QualitysDTO[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}