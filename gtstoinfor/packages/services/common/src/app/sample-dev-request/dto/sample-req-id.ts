import { ApiProperty } from "@nestjs/swagger";


export class SampleOrderIdRequest {
    @ApiProperty()
     sampleRequestId: number;
}