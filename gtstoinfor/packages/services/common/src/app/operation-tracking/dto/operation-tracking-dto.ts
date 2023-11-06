import { ApiProperty } from "@nestjs/swagger";
import { TrackingEnum } from "@project-management-system/shared-models";

export class OperationTrackingDto{
    @ApiProperty()
    operationTrackingId:number;
    @ApiProperty()
    jobNumber:string;
    @ApiProperty()
    styleId:number;
    @ApiProperty()
    operationSequenceId:number;
    @ApiProperty()
    operationInventoryId:number;
    @ApiProperty()
    operation:string;
    @ApiProperty()
    issuedQuantity:number;
    @ApiProperty()
    issuedUomId:number;
    @ApiProperty()
    damagedQuantity:number;
    @ApiProperty()
    damagedUomId:number;
    @ApiProperty()
    reportedQuantity:number;
    @ApiProperty()
    reportedUomId:number;
    @ApiProperty()
    rejectedQuantity:number;
    @ApiProperty()
    rejectedUomId:number;
    @ApiProperty()
    status:TrackingEnum;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    createdUser: string | null;
    @ApiProperty()
    updatedAt: Date;
    @ApiProperty()
    updatedUser: string | null;
    @ApiProperty()
    versionFlag: number;
    @ApiProperty()
    nextOperation: string;
    @ApiProperty()
    physicalUom:string
    @ApiProperty()
    physicalQuantity:number


}