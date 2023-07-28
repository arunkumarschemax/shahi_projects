import { GlobalResponseObject } from "../global-response-object";
import { OperationGroupsDto } from "./operation-groups.dto";


export class AllOperationGroupsResponseModel extends GlobalResponseObject {
    data?: OperationGroupsDto[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: OperationGroupsDto[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}
