import { ApiProperty } from "@nestjs/swagger";

export class SaveOrderDto {

    @ApiProperty()
    file:any
    @ApiProperty()
    createdUser:string;
}