import { ApiProperty } from "@nestjs/swagger";
import { StatusTypeEnum } from "@project-management-system/shared-models";

export class StatusDto {
   
    @ApiProperty()
    id: number;

    @ApiProperty()
    status: StatusTypeEnum
}