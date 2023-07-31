import { GlobalResponseObject } from "../global-response-object";


export class CountryStatusWiseResponseModel extends GlobalResponseObject {
    active?: number;
    inActive?: number;
    total?: number;
}
