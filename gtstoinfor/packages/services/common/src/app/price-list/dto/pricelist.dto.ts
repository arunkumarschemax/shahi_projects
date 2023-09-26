import { ApiProperty } from "@nestjs/swagger";

export class priceListDto {

  @ApiProperty()
    id: number;
    @ApiProperty()
    style:string;
    @ApiProperty()
    destination :string;
    @ApiProperty()
    seasonCode: string;
    @ApiProperty()
    year:string;
    @ApiProperty()
    price:number;
    @ApiProperty()
    currency:string;
    @ApiProperty()
    createdUser?: any;
    @ApiProperty()
    isActive?:boolean;
    @ApiProperty()
    versionFlag?: number;
    @ApiProperty()
    updatedUser?: string;
  }
  
  