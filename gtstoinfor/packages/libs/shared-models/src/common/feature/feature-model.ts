import { GlobalResponseObject } from "../global-response-object";
import { FeatureDTO } from "./feature-dto";

export class FeatureResponseModel extends GlobalResponseObject {
    data?: FeatureDTO[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: FeatureDTO[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}