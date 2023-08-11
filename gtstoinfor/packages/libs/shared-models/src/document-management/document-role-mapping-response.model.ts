
import { GlobalResponseObject } from "../common/global-response-object";
import { DocumentRoleMappingInfoDto } from "./document-role-mapping-info.dto";
import { RoleDto } from "./document-role-request-dto";
export class DocumentRoleMappingResponseModel extends GlobalResponseObject {
    data: DocumentRoleMappingInfoDto
    constructor(status: boolean, errorCode: number, internalMessage: string, data?: DocumentRoleMappingInfoDto) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}