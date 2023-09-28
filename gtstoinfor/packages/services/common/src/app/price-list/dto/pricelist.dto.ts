import { ApiProperty } from "@nestjs/swagger";

export class priceListDto {

  @ApiProperty()
    id: number;
    @ApiProperty()
    sampleCode:string;
    @ApiProperty()
    business :string;
    @ApiProperty()
    seasonCode: string;
    @ApiProperty()
    year:string;
    @ApiProperty()
    fobLocalCurrency:string;
    @ApiProperty()
    item:string;
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
  
  