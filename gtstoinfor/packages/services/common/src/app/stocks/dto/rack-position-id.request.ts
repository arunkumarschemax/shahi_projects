import { ApiProperty } from "@nestjs/swagger";

export class RackPositionIdRequest {
    @ApiProperty()
    rackPositionId: number;
    @ApiProperty()
    rackPositionCode: string;
}