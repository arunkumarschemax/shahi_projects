import { ApiProperty } from '@nestjs/swagger';
import { SampleDevelopmentStatusEnum } from '@project-management-system/shared-models';
import { SampleSizeReq } from './sample-req-size-req';
import { SamplefabricReq } from './sample-dev-fabric-info-req';
import { SampleTrimReq } from './sample-dev-trim-req';
import { SampleProcessInfoReq } from './sample-dev-process-info-req';

export class SampleDevDto {
  SampleRequestId:number;
  locationId : number;
  requestNo: string;
  styleId : number;
  pchId : number;
  buyerId : number;
  sampleTypeId : number;
  sampleSubTypeId : number;
  brandId: number;
  costRef: string;
  m3StyleNo: string;
  contact:string;
  extension:string;
  samValue:number;
  dmmId : number;
  technicianId : number;
  product:string;
  type:string;
  conversion:string;
  madeIn:string;
  facilityId: number;
  status: SampleDevelopmentStatusEnum;
  samplereqsizeinfo:SampleSizeReq[];
  samplereqfabricinfo:SamplefabricReq[]
  sampleTrimInfo:SampleTrimReq[]
  sampleProcessInfo:SampleProcessInfoReq[]

  constructor(
  SampleRequestId:number,
  locationId : number,
  requestNo: string,
  styleId : number,
  pchId : number,
  buyerId : number,
  sampleTypeId : number,
  sampleSubTypeId : number,
  brandId: number,
  costRef: string,
  m3StyleNo: string,
  contact:string,
  extension:string,
  samValue:number,
  dmmId : number,
  technicianId : number,
  product:string,
  type:string,
  conversion:string,
  madeIn:string,
  facilityId: number,
  status: SampleDevelopmentStatusEnum,
  samplereqsizeinfo:SampleSizeReq[],
  samplereqfabricinfo:SamplefabricReq[],
  sampleTrimInfo:SampleTrimReq[],
  sampleProcessInfo:SampleProcessInfoReq[]
  ){
    this.SampleRequestId=SampleRequestId
    this.locationId=locationId
    this.requestNo=requestNo
    this.styleId=styleId
    this.pchId=pchId
    this.buyerId=buyerId
    this.sampleTypeId=sampleTypeId
    this.sampleSubTypeId=sampleSubTypeId
    this.brandId=brandId
    this.costRef=costRef
    this.m3StyleNo=m3StyleNo
    this.contact=contact
    this.extension=extension
    this.samValue=samValue
    this.dmmId=dmmId
    this.technicianId=technicianId
    this.product=product
    this.type=type
    this.conversion=conversion
    this.madeIn=madeIn
    this.facilityId=facilityId
    this.status=status
    this.samplereqsizeinfo=samplereqsizeinfo
    this.samplereqfabricinfo=samplereqfabricinfo
    this.sampleTrimInfo=sampleTrimInfo
    this.sampleProcessInfo=sampleProcessInfo

  }
}
