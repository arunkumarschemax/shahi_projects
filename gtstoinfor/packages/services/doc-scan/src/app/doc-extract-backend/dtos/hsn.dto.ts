import { ApiProperty } from "@nestjs/swagger";
import { StatusEnum } from "packages/libs/shared-models/src/common/enum/status.enum";

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
  charge: string;

  @ApiProperty()
  unitquantity: string;

  //   @ApiProperty()
  //   UnitPrice: string;

  @ApiProperty()
  quotation: string;

  @ApiProperty()
  variance: string;

  @ApiProperty()
  VarianceStatus: StatusEnum;

  @ApiProperty()
  HsnId?: number;
}
