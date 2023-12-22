import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class operationReportRequest {
    @ApiProperty()
    sampleRequestId: number;
    @ApiProperty()
    operationId: number;
    @ApiProperty()
    operationCode: string;
    @ApiProperty()
    sequence: number;
    @ApiProperty()
    colorId: number;
    @ApiProperty()
    sizeId: number;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    reporterId: number;
    @ApiProperty()
    supervisorId: number;
}