import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class MaterialIssueRequest {
    @ApiProperty()
    @IsNotEmpty()
    materialIssueId:number;
  
}