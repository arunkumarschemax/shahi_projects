import { ApiProperty } from "@nestjs/swagger";

export class TrimDetailsRequest{
    @ApiProperty()
    orderNumber :string;
}