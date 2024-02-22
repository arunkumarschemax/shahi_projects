import { ApiProperty } from "@nestjs/swagger";


export class SampleItemIdRequest {
    @ApiProperty()
     sampleItemId: number;
}