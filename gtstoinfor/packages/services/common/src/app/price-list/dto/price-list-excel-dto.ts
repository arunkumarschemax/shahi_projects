import { ApiProperty } from "@nestjs/swagger";

export class priceListExcelDto {

    @ApiProperty()
    year:string;
    @ApiProperty()
    seasonCode: string;
    @ApiProperty()
    item: string;
    @ApiProperty()
    style:string;
    @ApiProperty()
    destination :string;
    @ApiProperty()
    price:string;
    @ApiProperty()
    currency:string;
    @ApiProperty()
    createdUser: string | null;
    @ApiProperty()
    updatedUser: string | null;
    @ApiProperty()
    createdAt: string;
    @ApiProperty()
    updatedAt: string;
    @ApiProperty()
    version?: number;

    constructor(
        year:string, 
        seasonCode: string, 
        item: string, 
        style:string, 
        destination : string, 
        price:string, 
        currency:string,
        createdUser: string | null,
        updatedUser: string | null,
        createdAt: string,
        updatedAt: string,
        version?: number
    ){
        this.year = year
        this.seasonCode = seasonCode
        this.item = item
        this.style = style
        this.destination = destination
        this.price = price
        this.currency = currency
        this.createdUser = createdUser
        this.updatedUser = updatedUser
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.version = version
    }
  }
  
  