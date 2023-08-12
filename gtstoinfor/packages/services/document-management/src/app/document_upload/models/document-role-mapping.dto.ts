import { ApiProperty } from "@nestjs/swagger";
import { CommonRequestAttrs } from "../../common/common-request-attr.model";

export class DocumentRoleMapping extends CommonRequestAttrs {

    @ApiProperty()
    docMappingId: number;
    @ApiProperty()
    documentId: number;
    @ApiProperty()
    roleName: string;
    @ApiProperty()
    documentName: string;

    constructor(docMappingId: number, documentId: number, roleName: string, documentName: string, username: string) {
        super(username);
        this.docMappingId = docMappingId;
        this.documentId = documentId;
        this.roleName = roleName;
        this.documentName = documentName;
    }
}