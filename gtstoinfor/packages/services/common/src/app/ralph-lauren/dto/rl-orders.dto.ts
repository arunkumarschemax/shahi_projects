import { ApiProperty } from "@nestjs/swagger";

export class RLOrdersDto {
   
    @ApiProperty()
    id: number;

    @ApiProperty()
    poNumber: string
    
    @ApiProperty()
    poItem: number
    
    @ApiProperty()
    shipToAddress: string 

    @ApiProperty()
    agent: string
    
    @ApiProperty()
    purchaseGroup: string 

    @ApiProperty()
    supplier: string 
     
    @ApiProperty()
    revisionNo: number 

    @ApiProperty()
    poUploadDate: string 
     
    @ApiProperty()
    status: string 

    @ApiProperty()
    division: string 

    @ApiProperty()
    shipTo: string 
 
    @ApiProperty()
    seasonCode: string 


    @ApiProperty()
    boardCode: string 


    @ApiProperty()
    style: string 

    @ApiProperty()
    materialNo: string 

    @ApiProperty()
    rlStyleNo: string 

    @ApiProperty()
    color: string 

    @ApiProperty()
    size: string 

    @ApiProperty()
    totalQty: number
    

    @ApiProperty()
    shipDate: string 

    @ApiProperty()
    shipMode: string 


    @ApiProperty()
    msrpPrice: string 

    @ApiProperty()
    msrpCurrency: string 

    @ApiProperty()
    csPrice: string 

    @ApiProperty()
    csCurrency: string 

    @ApiProperty()
    amount: string 

    @ApiProperty()
    totalAmount: string 

    @ApiProperty()
    price: string 

    @ApiProperty()
    currency: string 

    @ApiProperty()
    quantity: number 

    @ApiProperty()
    upcEan: string 

    @ApiProperty()
    buyer: string 

    createdAt: string;

    @ApiProperty()
    createdUser: string | null;

    updatedAt: string;
    
    @ApiProperty()
    updatedUser: string | null;

 

   

}