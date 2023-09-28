import { ApiProperty } from "@nestjs/swagger";

export class ServiceCodeFilter {
  @ApiProperty()
  vendorName: string;

  @ApiProperty()
  HSNCode: string;

  @ApiProperty()
  serviceDescription: string;

}
