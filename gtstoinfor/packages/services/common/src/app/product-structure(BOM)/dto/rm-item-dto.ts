import { ApiProperty } from "@nestjs/swagger";
 
 export class FgRMItemsMappingDto {
 
    @ApiProperty()
    rmitemId: number;
    
    @ApiProperty()
    rmitemCode: string;

    @ApiProperty()
    operationId: number;


 }