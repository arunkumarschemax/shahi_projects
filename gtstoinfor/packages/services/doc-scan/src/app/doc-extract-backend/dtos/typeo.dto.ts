import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";
import { HsnDto } from "./hsn.dto";
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

  @ApiProperty()
  Routing: string;

  @ApiProperty()
  Comment: string;

  @ApiProperty()
  Financialyear: string;

  @ApiProperty()
  Timecreated: string;

  @ApiProperty()
  buyerCode: string;

  @ApiProperty()
  createdUser: string;

  // @ApiProperty()
  // HsnInfo: HsnDto[]

  @ApiProperty()
  Id?: number;

}
