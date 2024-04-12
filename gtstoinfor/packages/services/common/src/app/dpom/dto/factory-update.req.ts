import { ApiProperty } from "@nestjs/swagger";

export class FactoryUpdate {
    @ApiProperty()
    poAndLine: string;
    @ApiProperty()
    actualUnit : string;
    @ApiProperty()
    allocatedQuantity : string;
    
}