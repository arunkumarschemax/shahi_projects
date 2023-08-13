import { ApiProperty } from "@nestjs/swagger";
import { CommonRequestAttrs } from "../../common/common-request-attr.model";

export class DocumentRoleMapping extends CommonRequestAttrs {

    @ApiProperty()
    docMappingId: number;
    @ApiProperty()
    documentId: number[];
    @ApiProperty()
    roleName: string;
    @ApiProperty()
    documentName: string;
    @ApiProperty()
    roleId: number;

    constructor(docMappingId: number, documentId: number[], roleName: string, documentName: string,roleId:number, username: string) {
        super(username);
        this.docMappingId = docMappingId;
        this.documentId = documentId;
        this.roleName = roleName;
        this.documentName = documentName;
        this.roleId=roleId
    }
}


export class DocumentRoleMappingMulti extends CommonRequestAttrs {

    @ApiProperty()
    docMappingId: number;
    @ApiProperty()
    documentId: number[];
    @ApiProperty()
    roleName: string;
    @ApiProperty()
    documentName: string;
    @ApiProperty()
    roleId: number;

    constructor(docMappingId: number, documentId: number[], roleName: string, documentName: string,roleId:number, username: string) {
        super(username);
        this.docMappingId = docMappingId;
        this.documentId = documentId;
        this.roleName = roleName;
        this.documentName = documentName;
        this.roleId=roleId
    }
}