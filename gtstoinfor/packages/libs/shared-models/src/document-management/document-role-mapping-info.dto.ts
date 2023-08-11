export class DocumentRoleMappingInfoDto {
    docMappingId: number;
    documentId: number;
    roleName: string;
    documentName: string;
    username: string;

    constructor(docMappingId: number,documentId: number,roleName: string,documentName: string,username: string){
        this.docMappingId = docMappingId;
        this.documentId = documentId;
        this.roleName = roleName;
        this.documentName = documentName;
        this.username = username;
    }
}