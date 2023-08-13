export class DocumentRoleMappingInfoDto {
    docMappingId: number;
    documentId: number;
    roleName: string;
    documentName: string;
    username: string;
    isActive?:boolean
    versionFlag?:number

    constructor(docMappingId: number,documentId: number,roleName: string,documentName: string,username: string,isActive?:boolean,versionFlag?:number){
        this.docMappingId = docMappingId;
        this.documentId = documentId;
        this.roleName = roleName;
        this.documentName = documentName;
        this.username = username;
        this.isActive=isActive
        this.versionFlag=versionFlag
    }
}