import { GlobalResponseObject } from "../global-response-object";
import { EmployeeDetailsResponse } from "./employee-details-req";


export class AllEmployeeDetailsResponseModel extends GlobalResponseObject {
    data?: EmployeeDetailsResponse[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: EmployeeDetailsResponse[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

