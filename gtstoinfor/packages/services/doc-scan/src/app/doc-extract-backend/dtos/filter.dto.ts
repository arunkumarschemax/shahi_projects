import { ApiProperty } from "@nestjs/swagger";
import { StatusEnum } from "packages/libs/shared-models/src/common/enum/status.enum";

export class filterDto {
  @ApiProperty()
  vendorName?: string;
}
