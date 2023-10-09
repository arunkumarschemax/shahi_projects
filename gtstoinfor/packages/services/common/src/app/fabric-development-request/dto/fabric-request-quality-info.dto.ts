import { ApiProperty } from "@nestjs/swagger";
import { StatusEnum } from "@project-management-system/shared-models";
import { FabricRequestItemsDto } from "./fabric-request-items.dto";

export class FabricRequestQualitiesInfoDto {
    
    // createdAt : Date;

    // @ApiProperty()
    // createdUser : string;
  
    // updatedAt : Date;

    // @ApiProperty()
    // updatedUser : string;
  
    // @ApiProperty()
    // versionFlag : number;

    @ApiProperty()
    styleId: number;

    @ApiProperty()
    colorId: number;

    @ApiProperty()
    garmentQuantity:number;

    @ApiProperty()
    consumption:number;

    @ApiProperty()
    wastage:number;

    @ApiProperty()
    fabricQuantity:number;

    @ApiProperty()
    uomId:number;

    @ApiProperty()
    fileName: string;

    @ApiProperty()
    filePath: string;

    @ApiProperty()
    status: StatusEnum;

    @ApiProperty()
    remarks: string;
    
    @ApiProperty({type:[FabricRequestItemsDto]})
    itemsinfo:FabricRequestItemsDto[]; 
     
    @ApiProperty()
    fabricRequestQualityId: number;
    

   
    // @ApiProperty()
    // fabricRequestQualityInfoId?: number;
     
    
    

}