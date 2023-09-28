import { ApiProperty } from "@nestjs/swagger";
export class FilterDto {


  @ApiProperty()
  hsnCode: string;

  @ApiProperty()
  serviceDescription: string;

  @ApiProperty()
  vendorName: string;

 


}