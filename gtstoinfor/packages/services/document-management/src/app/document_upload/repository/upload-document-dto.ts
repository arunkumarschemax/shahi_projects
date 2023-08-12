import { ApiProperty } from "@nestjs/swagger";

export class UpLoadDocumentList{
    @ApiProperty()
    documentsListId: number;

     @ApiProperty()
    documentCategoryId: number;

     @ApiProperty()
    roleId: number;

    @ApiProperty()
    customerPo: string;

    @ApiProperty()
    orderId: number;

    @ApiProperty()
    fileName: string;

    @ApiProperty()
    filePath: string;

    @ApiProperty()
    isUploaded: boolean;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    createdUser: string | null;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    updatedUser: string | null;

    @ApiProperty()
    versionFlag: number;
}