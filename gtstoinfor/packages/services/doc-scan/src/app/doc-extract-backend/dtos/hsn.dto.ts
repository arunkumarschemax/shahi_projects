import { ApiProperty } from "@nestjs/swagger";
import { StatusEnum } from "@xpparel/shared-models";

export class HsnDto {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  HSN: string;

  @ApiProperty()
  taxType: string;

  @ApiProperty()
  taxAmount: string;

  @ApiProperty()
  taxPercentage: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  charge: string;

  @ApiProperty()
  unitQuantity: string;

  @ApiProperty()
  unitPrice: string;

  @ApiProperty()
  quotation: string;

  @ApiProperty()
  variance: string;

  // @ApiProperty()
  // status: string;

  // @ApiProperty()
  // VarianceStatus: StatusEnum;

  @ApiProperty()
  HsnId?: number;
}
