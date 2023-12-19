import { ApiProperty } from "@nestjs/swagger";


export class OrderQuantityRequset {
    @ApiProperty()
     sampleRequestId: number;
     @ApiProperty()
     colourId: number;
     @ApiProperty()
     sizeId: number;
}