import { ApiProperty } from "@nestjs/swagger";
export class ScanDto {

  @ApiProperty()
  typeId: number;

  @ApiProperty()
  Gst: string;

  @ApiProperty()
  Ifsc: string;

  @ApiProperty()
  Innvoice: string;

  @ApiProperty()
  Customer: string;

  @ApiProperty()
  Volume: string;

  @ApiProperty()
  Weight: string;

  @ApiProperty()
  Chargeable: string;

  @ApiProperty()
  Packages: string;
  
  @ApiProperty()
  Date: string;
  
  @ApiProperty()
  Cartons: string;
  
  @ApiProperty()
  Console: string;
  
  @ApiProperty()
  PO: string;
  
  @ApiProperty()
  Payref: string;
  
  @ApiProperty()
  Quantity: string;

  @ApiProperty()
  InnvoiceNumber: string;
  
  @ApiProperty()
  Currency: string;

  @ApiProperty()
  Origin: string;

  @ApiProperty()
  Destination: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  versionFlag: number;
}
