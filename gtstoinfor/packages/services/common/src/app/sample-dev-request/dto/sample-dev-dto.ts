import { ApiProperty } from '@nestjs/swagger';
import { SampleDevelopmentStatusEnum, StatusEnum } from '@project-management-system/shared-models';

export class SampleDevReqDto {
  @ApiProperty()
  SampleRequestId: number;

  @ApiProperty()
  requestNo: string;
  @ApiProperty()
  expectedCloseDate: Date;

  @ApiProperty()
  locationId: number;
  locationName : string

  @ApiProperty()
  styleId : number
  style : string

  @ApiProperty()
  pchId : number
  profitControlHead : string

  @ApiProperty()
  buyerId : number
  buyerName : string

  @ApiProperty()
  sampleTypeId : number
  sampleType: string

  @ApiProperty()
  sampleSubTypeId : number
  sampleSubType : string

  @ApiProperty()
  brandId : number
  brandName : string

  @ApiProperty()
  costRef: string;

  @ApiProperty()
  m3StyleNo: string;

  @ApiProperty()
  contact:string;

  @ApiProperty()
  extension:string;

  @ApiProperty()
  samValue:number;
  
  @ApiProperty()
  dmmId : number
  dmmEmployee : string

  @ApiProperty()
  technicianId : number
  techEmployee : string

  @ApiProperty()
  product:string;

  @ApiProperty()
  type:string;

  @ApiProperty()
  conversion:string;

  @ApiProperty()
  madeIn:number;

  @ApiProperty()
  facilityId : number;

  @ApiProperty()
  status: SampleDevelopmentStatusEnum;
}

