import { ApiProperty } from "@nestjs/swagger";
import { StatusEnum } from "packages/libs/shared-models/src/common/enum/status.enum";

export class HsnDto {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  HSN: string;

  @ApiProperty()
  TaxType: string;

  @ApiProperty()
  TaxAmount: string;

  @ApiProperty()
  Taxpercentage: string;

  @ApiProperty()
  Charge: string;

  @ApiProperty()
  UnitQuantity: string;

  //   @ApiProperty()
  //   UnitPrice: string;

  @ApiProperty()
  Quotation: string;

  @ApiProperty()
  Variance: string;

  @ApiProperty()
  VarianceStatus: StatusEnum;

  @ApiProperty()
  @ApiProperty()
  HsnId?: number;
}
