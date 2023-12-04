import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class PaymentMethodRequest {
    @ApiProperty()
    @IsNotEmpty()
    TypeId: number;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    Type: string;

    @ApiProperty()
    isActive: boolean;  
    
    @ApiProperty()
    @IsOptional()
    updatedUser: string;


    @ApiProperty()
    @IsOptional()
     @IsNumber()
    versionFlag: number;


}