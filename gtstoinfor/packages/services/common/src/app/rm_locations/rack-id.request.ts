import { ApiProperty } from '@nestjs/swagger';
export class RackIdRequest {
    @ApiProperty()
    rackId: number
}
