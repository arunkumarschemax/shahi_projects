import { GlobalResponseObject } from "../global-response-object";
import { CountryDto } from "./countries.dto";


export class CountriesResponseModel extends GlobalResponseObject{
    data?: CountryDto;

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: CountryDto){
        super(status,intlCode,internalMessage);
        this.status = status;
        // this.intlCode = intlCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}
