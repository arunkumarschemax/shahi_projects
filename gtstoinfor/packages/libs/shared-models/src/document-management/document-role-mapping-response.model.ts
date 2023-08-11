
import { GlobalResponseObject } from "../common/global-response-object";
import { RoleDto } from "./document-role-request-dto";
export class DocumentRoleMappingResponseModel extends GlobalResponseObject {
    data: RoleDto
    constructor(status: boolean, errorCode: number, internalMessage: string, data?: RoleDto) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}