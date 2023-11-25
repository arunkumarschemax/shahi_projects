import { GlobalResponseObject } from "../global-response-object";
import { ColumnModel } from "./column.model";


export class ColumnResponseModel extends GlobalResponseObject {
    data?: ColumnModel[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ColumnModel[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
}
}

