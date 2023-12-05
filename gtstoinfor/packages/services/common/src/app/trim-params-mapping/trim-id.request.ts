import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class TrimIdRequest {
    @ApiProperty()
    trimId: number;
}