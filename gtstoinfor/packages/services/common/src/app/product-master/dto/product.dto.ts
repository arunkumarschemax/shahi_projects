import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  product: string;

  @ApiProperty()
  isActive: boolean;
  createdAt : Date;

  @ApiProperty()
  createdUser : string;
  updatedAt : Date;
  
  @ApiProperty()
  updatedUser : string;

  @ApiProperty()
  versionFlag : number;
}

