import { ApiProperty } from "@nestjs/swagger";
export class SampleOrderSizesRequest {
    @ApiProperty()
     sampleRequestId: number;
     @ApiProperty()
     colorId: number;
}