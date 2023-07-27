import { GlobalResponseObject } from "../global-response-object";


export class BuyerStatusWiseResponseModel extends GlobalResponseObject {
    active?: number;
    inActive?: number;
    total?: number;
}
