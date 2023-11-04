import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class OperationInvRequest {
    @ApiProperty()
    @IsNotEmpty()
    operationId: number;
}