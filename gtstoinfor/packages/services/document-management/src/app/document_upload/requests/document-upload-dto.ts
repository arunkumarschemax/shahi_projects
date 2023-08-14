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

