import { ApiProperty } from '@nestjs/swagger';

export class FilesDto {
    @ApiProperty({ type: 'file', format: 'binary' })
    file: string;
}

export class DocumentUploadDto {
    @ApiProperty()
    documentsListId: number;
    @ApiProperty()
    documentCategoryId: number;
    @ApiProperty()
    roleId: number;
    @ApiProperty()
    customerPo:string
    @ApiProperty()
    orderId:number
    @ApiProperty({ type: [FilesDto]})
    file: FilesDto[];
}

export class UploadedFileid{
    @ApiProperty()
    uploadFileId:number
    @ApiProperty()
    documentListId:number
    constructor(
    uploadFileId:number,
    documentListId:number
    ){
        this.uploadFileId=uploadFileId
        this.documentListId=documentListId
    }
}