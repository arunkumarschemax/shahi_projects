import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class ItemTypeRequest {
    @ApiProperty()
    itemTypeId:number;
    
    @ApiProperty()
    itemType: string;

    @ApiProperty()
    createdUser: string;

    @ApiProperty()
    isActive: boolean;  

    @ApiProperty()
    updatedUser: string;

    @ApiProperty()
     @IsNumber()
    versionFlag: number;

}