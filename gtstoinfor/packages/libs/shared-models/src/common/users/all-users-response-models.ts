import { GlobalResponseObject } from "../global-response-object";
import { UsersDto } from "./users.dto";

export class AllUsersResponseModel extends GlobalResponseObject {
    data? : UsersDto[];
     /**
     * 
     * @param status 
     * @param errorCode 
     * @param internalMessage 
     * @param data //DepartmentDto
     */

     constructor(status: boolean, errorCode: number, internalMessage: string, data?: UsersDto[]){
        super(status, errorCode, internalMessage);
        this.data = data;
     }

}