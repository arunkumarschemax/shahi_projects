import { GlobalResponseObject } from "../global-response-object";
import { StyleOrderModel } from "./style-order-model";


export class StyleOrderResponseModel extends GlobalResponseObject {
    data: StyleOrderModel[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data: StyleOrderModel[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

