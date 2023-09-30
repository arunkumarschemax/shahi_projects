import { ApiProperty } from "@nestjs/swagger";
import { StatusEnum } from "@project-management-system/shared-models";

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
    FileName: string;

    @ApiProperty()
    FilePath: string;

    @ApiProperty()
    status: StatusEnum;

    @ApiProperty()
    remarks: string;
    
    @ApiProperty({type:[FabricRequestQualitiesInfoDto]})
    qualities:FabricRequestQualitiesInfoDto[];

    @ApiProperty()
    fabricRequestQualityInfoId?: number;
     
    
    

}