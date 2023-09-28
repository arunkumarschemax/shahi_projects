import { ApiProperty } from "@nestjs/swagger";

export class priceListExcelDto {

    @ApiProperty()
    priceListId:number
    @ApiProperty()
    year:string;
    @ApiProperty()
    seasonCode: string;
    @ApiProperty()
    item: string;
    @ApiProperty()
    sampleCode:string;
    @ApiProperty()
    business :string;
    @ApiProperty()
    fobLocalCurrency:string;
    @ApiProperty()
    currency:string;
    @ApiProperty()
    createdUser: string | null;
    @ApiProperty()
    updatedUser: string | null;
    // @ApiProperty()
    // createdAt?: string;
    // @ApiProperty()
    // updatedAt?: string;
    @ApiProperty()
    version?: number;
    // @ApiProperty()
    // versionFlag?: number;
    @ApiProperty()
    fileId?: number;

    constructor(
        priceListId:number,
        year:string, 
        seasonCode: string, 
        item: string, 
        sampleCode:string, 
        business : string, 
        fobLocalCurrency:string, 
        currency:string,
        createdUser: string | null,
        updatedUser: string | null,
        // createdAt?: string,
        // updatedAt?: string,
        version?: number,
        // versionFlag?: number,
        fileId?: number
    ){
        this.priceListId = priceListId
        this.year = year
        this.seasonCode = seasonCode
        this.item = item
        this.sampleCode = sampleCode
        this.business = business
        this.fobLocalCurrency = fobLocalCurrency
        this.currency = currency
        this.createdUser = createdUser
        this.updatedUser = updatedUser
        // this.createdAt = createdAt
        // this.updatedAt = updatedAt
        this.version = version
        // this.versionFlag = versionFlag
        this.fileId = fileId
    }
  }
  
  