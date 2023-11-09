import { GlobalResponseObject } from "../global-response-object";
import { RequestNoDto } from "./requestno.dto";

export class ResponesNoDropDownRes extends GlobalResponseObject {
data ? :RequestNoDto[];
constructor(status: boolean, intlCode: number, internalMessage: string, data?: RequestNoDto[]) {
    super(status, intlCode, internalMessage);
    this.data = data;
}

}