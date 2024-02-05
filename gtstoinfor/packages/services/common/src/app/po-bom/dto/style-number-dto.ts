import { ApiProperty } from "@nestjs/swagger";

export class StyleNumberDto {
    @ApiProperty()
     style:string
     @ApiProperty()
     trimName:string
}