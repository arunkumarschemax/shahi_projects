import { ApiProperty } from "@nestjs/swagger";
import { PropertyEnum } from "@project-management-system/shared-models";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class productGroupDto{
    @ApiProperty()
    productGroupId:number;


}