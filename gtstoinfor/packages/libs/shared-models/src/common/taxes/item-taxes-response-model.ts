import { GlobalResponseObject } from "../global-response-object";
import { TaxesDto } from "./taxes.dto";

export class TaxesResponseModel extends GlobalResponseObject{
    data?:TaxesDto;
}
