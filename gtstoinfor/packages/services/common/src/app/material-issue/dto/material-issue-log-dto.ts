import { ApiProperty } from "@nestjs/swagger";


export class MaterialIssueLogDto{
    @ApiProperty()
    materialIssueLogId:number;

    @ApiProperty()
    materialAllocationId:number;

    @ApiProperty()
    itemType:string;


    @ApiProperty()
    sampleOrderId:number

    @ApiProperty()
    sampleItemId:number

    @ApiProperty()
    m3ItemId:number

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    stockId:number

    @ApiProperty()
    locationId:number

    @ApiProperty()
    location:string

    @ApiProperty()
    allocateQuantity:number

    @ApiProperty()
    buyerId:number

    @ApiProperty()
    buyer:string

    @ApiProperty()
   requestNo:string;

    @ApiProperty()
    createdUser: string | null;

   
}