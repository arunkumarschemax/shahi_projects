import { ApiProperty } from "@nestjs/swagger";

export class uploadContentDto {

  @ApiProperty()
  style: string;
  @ApiProperty()
  component: string;
  @ApiProperty()
  fabricContent: string;
 
}

