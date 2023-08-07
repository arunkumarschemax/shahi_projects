import { GlobalResponseObject } from "../global-response-object";
import { CountryDto } from "./countries.dto";



export class AllCountriesResponseModel extends GlobalResponseObject {
    data?: CountryDto[];

    /**
     * 
     * @param status 
     * @param intlCode 
     * @param internalMessage 
     * @param data 
     */
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: CountryDto[]){
        super(status,intlCode,internalMessage);
        this.status = status;
        // this.intlCode = intlCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}

