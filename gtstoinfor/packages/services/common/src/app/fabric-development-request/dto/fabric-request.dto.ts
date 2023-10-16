import { ApiProperty } from "@nestjs/swagger";
import { StatusEnum } from "@project-management-system/shared-models";
import { FabricRequestQualitiesDto } from "./fabric-request-qualities.dto";

export class FabricRequestDto{

    // createdAt : Date;

    // @ApiProperty()
    // createdUser : string;
  
    // updatedAt : Date;

    // @ApiProperty()
    // updatedUser : string;
  
    // @ApiProperty()
    // versionFlag : number;


    @ApiProperty()
    locationId: number;

    @ApiProperty()
    requestNo: string;     //  Auto Generate

    @ApiProperty()
    styleId: number;

    @ApiProperty()
    pchId: number;

    @ApiProperty()
    buyerId: number;

    @ApiProperty()
    type: string;

    @ApiProperty()
    sampleTypeId: number;

    @ApiProperty()
    remarks: string;

    @ApiProperty()
    fabricResponsible: number;

    @ApiProperty()
    facilityId: number;

    @ApiProperty()
    lightSourcePrimary: string;

    @ApiProperty()
    lightSourceSecondary: string;

    @ApiProperty()
    lightSourceTertiary: string;

    @ApiProperty()
    status: StatusEnum;

    @ApiProperty()
    uid: string;

    @ApiProperty()
    fileName: string;

    @ApiProperty() 
    filePath: string;

    @ApiProperty({type:[FabricRequestQualitiesDto]})
    qualities:FabricRequestQualitiesDto[];


   


}