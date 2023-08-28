import { ApiProperty } from "@nestjs/swagger";

export class FileUpdateStatusReq{
    @ApiProperty()
    fileId: number;
    @ApiProperty()
    status: string;
    @ApiProperty()
    updatedUser: string;
}