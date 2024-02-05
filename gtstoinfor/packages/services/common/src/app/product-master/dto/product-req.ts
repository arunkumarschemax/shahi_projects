import { ApiProperty } from '@nestjs/swagger';

export class ProductReq {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  updatedUser : string;
}

