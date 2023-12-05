import { GlobalResponseObject } from "../global-response-object";
import { ThicknessModel } from "./thickness.model";


export class ThicknessResponseModel extends GlobalResponseObject {
    data?: ThicknessModel[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ThicknessModel[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}

