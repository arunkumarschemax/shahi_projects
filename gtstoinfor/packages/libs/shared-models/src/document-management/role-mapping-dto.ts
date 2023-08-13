import { CommonRequestAttrs } from "../common/common-request-attr.model";

export class DocumentRoleMappingDto  {
   
    docMappingId: number;
    documentId: number[];
    roleName: string;
    documentName: string;
    roleId:number

    constructor(docMappingId: number, documentId: number[], roleName: string, documentName: string,roleId:number, username: string) {
        this.docMappingId = docMappingId;
        this.documentId = documentId;
        this.roleName = roleName;
        this.documentName = documentName;
        this.roleId=roleId
    }
}