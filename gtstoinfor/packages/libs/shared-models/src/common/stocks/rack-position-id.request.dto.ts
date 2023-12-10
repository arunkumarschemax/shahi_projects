import { ApiProperty } from "@nestjs/swagger";

export class RackPositionIdRequestDto {
    rackPositionId: number;
    rackPositionCode: string;
    constructor(rackPositionId: number,
        rackPositionCode: string){
            this.rackPositionId = rackPositionId
            this.rackPositionCode = rackPositionCode

        }
}