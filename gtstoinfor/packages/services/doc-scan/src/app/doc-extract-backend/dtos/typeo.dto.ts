import { ApiProperty } from "@nestjs/swagger";
export class ScanDto {

 
  @ApiProperty()
  GST: string;

   @ApiProperty()
  Vendor: string;

  @ApiProperty()
  invoiceDate: string;

  @ApiProperty()
  Cgst: string;


  @ApiProperty()
  IGST: string;

  @ApiProperty()
  Sgst: string;

   @ApiProperty()
  InnvoiceNumber: string;

  @ApiProperty()
  InnvoiceAmount: string;

  @ApiProperty()
  InnvoiceCurrency: string;

}