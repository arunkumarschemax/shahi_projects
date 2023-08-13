import { ApiProperty } from "@nestjs/swagger";

export class FileIdReq{
    @ApiProperty()
    fileId :number;
}