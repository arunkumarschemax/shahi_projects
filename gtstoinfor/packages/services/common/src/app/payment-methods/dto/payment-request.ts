import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class PaymentMethodRequest {
    @ApiProperty()
    @IsNotEmpty()
    paymentMethodId: number;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    paymentMethod: string;

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