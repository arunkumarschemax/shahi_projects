import { ApiProperty } from "@nestjs/swagger";

export class UploadFileDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    fileName: string;
    @ApiProperty()
    filePath: string;
    @ApiProperty()
    documentListId: number;

    constructor(id: number, fileName: string,filePath: string,documentListId: number) {
        this.id = id;
        this.fileName = fileName;
        this.filePath = filePath;
        this.documentListId = documentListId;
    }

}
