import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";
export class ScanDto {
  @PrimaryGeneratedColumn("increment", {
    name: "id",
  })
  Id: number;
 
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
createdAt:Date;

@ApiProperty()
createdUser:string;

@ApiProperty()
updatedAt:Date;

@ApiProperty()
updatedUser:string


@ApiProperty()
versionFlag:number;
}