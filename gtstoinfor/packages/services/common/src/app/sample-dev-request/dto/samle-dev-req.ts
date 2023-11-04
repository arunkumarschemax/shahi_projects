import { ApiProperty } from '@nestjs/swagger';
import { SampleDevelopmentStatusEnum } from '@project-management-system/shared-models';
import { SampleSizeReq } from './sample-req-size-req';
import { SamplefabricReq } from './sample-dev-fabric-info-req';
import { SampleTrimReq } from './sample-dev-trim-req';
import { SampleProcessInfoReq } from './sample-dev-process-info-req';

export class SampleRequestDto {
  @ApiProperty()
  SampleRequestId: number;
  @ApiProperty()
  locationId: number;
  @ApiProperty()
  requestNo: string;
  @ApiProperty()
  pchId: number;
  @ApiProperty()
  user: string;
  @ApiProperty()
  buyerId: number;
  @ApiProperty()
  sampleTypeId: number;
  @ApiProperty()
  sampleSubTypeId: number;
  @ApiProperty()
  styleId: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  brandId: number;
  @ApiProperty()
  costRef: string;
  @ApiProperty()
  m3StyleNo: string;
  @ApiProperty()
  contact: string;
  @ApiProperty()
  extension: string;
  @ApiProperty()
  samValue: number;
  @ApiProperty()
  dmmId: number;
  @ApiProperty()
  technicianId: number;
  @ApiProperty()
  product: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  conversion: string;
  @ApiProperty()
  madeIn: string;
  @ApiProperty()
  facilityId: number;
  @ApiProperty()
  remarks: string;
  @ApiProperty()
  status: SampleDevelopmentStatusEnum;
  @ApiProperty({ type: [SampleSizeReq] })
  sampleReqSizeInfo: SampleSizeReq[];
  @ApiProperty({ type: [SamplefabricReq] })
  sampleReqFabricInfo: SamplefabricReq[]
  @ApiProperty({ type: [SampleTrimReq] })
  sampleTrimInfo: SampleTrimReq[]
  @ApiProperty({ type: [SampleProcessInfoReq] })
  sampleProcessInfo: SampleProcessInfoReq[]

  constructor(

    SampleRequestId: number,
    locationId: number,
    requestNo: string,
    pchId: number,
    user: string,
    buyerId: number,
    sampleTypeId: number,
    sampleSubTypeId: number,
    styleId: number,
    description: string,
    brandId: number,
    costRef: string,
    m3StyleNo: string,
    contact: string,
    extension: string,
    samValue: number,
    dmmId: number,
    technicianId: number,
    product: string,
    type: string,
    conversion: string,
    madeIn: string,
    facilityId: number,
    remarks: string,
    status:SampleDevelopmentStatusEnum,
    sampleReqSizeInfo: SampleSizeReq[],
    sampleReqFabricInfo: SamplefabricReq[],
    sampleTrimInfo: SampleTrimReq[],
    sampleProcessInfo: SampleProcessInfoReq[]
  ) {
    this.SampleRequestId = SampleRequestId
    this.locationId = locationId
    this.requestNo = requestNo
    this.pchId = pchId
    this.user = user
    this.buyerId = buyerId
    this.sampleTypeId = sampleTypeId
    this.sampleSubTypeId = sampleSubTypeId
    this.styleId = styleId
    this.description = description
    this.brandId = brandId
    this.costRef = costRef
    this.m3StyleNo = m3StyleNo
    this.contact = contact
    this.extension = extension
    this.samValue = samValue
    this.dmmId = dmmId
    this.technicianId = technicianId
    this.product = product
    this.type = type
    this.conversion = conversion
    this.madeIn = madeIn
    this.facilityId = facilityId
    this.remarks = remarks
    this.status=status
    this.sampleReqSizeInfo = sampleReqSizeInfo
    this.sampleReqFabricInfo = sampleReqFabricInfo
    this.sampleTrimInfo = sampleTrimInfo
    this.sampleProcessInfo = sampleProcessInfo

  }
}
