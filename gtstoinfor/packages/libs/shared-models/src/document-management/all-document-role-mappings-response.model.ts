
import { GlobalResponseObject } from "../common/global-response-object";
import { DocumentRoleMappingInfoDto } from "./document-role-mapping-info.dto";
export class AllDocumentRoleMappingsResponseModel extends GlobalResponseObject {
    data: DocumentRoleMappingInfoDto[]
    constructor(status: boolean, errorCode: number, internalMessage: string, data?: DocumentRoleMappingInfoDto[]) {
        super(status, errorCode, internalMessage);
        this.data = data;
    }
}