import { ApiProperty } from "@nestjs/swagger";

export class FabricRequestItemsDto {

    @ApiProperty()
    itemCode: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    fabricRequestQualityInfoId: number;



    // @ApiProperty()
    // fabricRequestItemsId?: number;
    
    // createdAt : Date;

    // @ApiProperty()
    // createdUser : string;
  
    // updatedAt : Date;

    // @ApiProperty()
    // updatedUser : string;
  
    // @ApiProperty()
    // versionFlag : number;
   

}
