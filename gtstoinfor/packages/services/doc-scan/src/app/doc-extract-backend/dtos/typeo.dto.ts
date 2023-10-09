import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";
import { HsnDto } from "./hsn.dto";
export class ScanDto {
  
 
  @ApiProperty()
  gstNumber: string;

  @ApiProperty()
  venName: string;

  @ApiProperty()
  venCod: string;

  @ApiProperty()
  invoiceDate: string;

  @ApiProperty()
  cgst: string;

  @ApiProperty()
  igst: string;

  @ApiProperty()
  sgst: string;

  @ApiProperty()
  invoiceNumber: string;

  @ApiProperty()
  invoiceAmount: string;

  @ApiProperty()
  invoiceCurrency: string;

  @ApiProperty()
  financialYear: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdUser: string;

  @ApiProperty()
  Hsninfo: HsnDto[]

  @ApiProperty()
  Id?: number;

}
