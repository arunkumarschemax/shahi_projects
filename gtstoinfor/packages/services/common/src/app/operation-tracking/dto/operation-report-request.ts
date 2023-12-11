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
}