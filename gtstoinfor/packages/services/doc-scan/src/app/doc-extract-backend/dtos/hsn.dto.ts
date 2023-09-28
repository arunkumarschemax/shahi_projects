import { ApiProperty } from "@nestjs/swagger";
import { StatusEnum } from "@xpparel/shared-models";

export class HsnDto {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  HSN: string;

  @ApiProperty()
  Taxtype: string;

  @ApiProperty()
  Taxamount: string;

  @ApiProperty()
  Taxpercentage: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  Charge: string;

  @ApiProperty()
  unitquantity: string;

  @ApiProperty()
  unitPrice: string;

  @ApiProperty()
  quotation: string;

  @ApiProperty()
  variance: string;

  // @ApiProperty()
  // status: string;

  @ApiProperty()
  VarianceStatus: StatusEnum;

  @ApiProperty()
  HsnId?: number;
}
