import { ApiProperty } from "@nestjs/swagger";

export class filterDto {
  @ApiProperty()
  vendorName?: string;
}
