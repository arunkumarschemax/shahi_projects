import { ApiProperty } from "@nestjs/swagger";

export class priceListRequest {
    @ApiProperty()
    sampleCode:string;
    @ApiProperty()
    business:string;
}
