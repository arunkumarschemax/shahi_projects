import { ApiProperty } from '@nestjs/swagger';
import { SampleDevelopmentStatusEnum, StatusEnum } from '@project-management-system/shared-models';

export class SampleDevDto {
  SampleRequestId: number;
  locationId: number;
  locationName: string;
  requestNo: string;
  styleId : number
  style : string
  pchId : number
  profitControlHead : string
  buyerId : number
  buyerName : string
  sampleTypeId : number
  sampleType: string
  sampleSubTypeId : number
  sampleSubType : string
  brandId : number
  brandName : string
  costRef: string;
  m3StyleNo: string;
  contact:string;
  extension: string
  samValue : number
  dmmId : number
  dmmEmployee : string
  technicianId : number
  techEmployee : string
  product : string
  type : string
  conversion : string
  madeIn : string
  facilityId : number;
  status: SampleDevelopmentStatusEnum;

  constructor(
    SampleRequestId: number,
  locationId: number,
  locationName: string,
  requestNo: string,
  styleId : number,
  style : string,
  pchId : number,
  profitControlHead : string,
  buyerId : number,
  buyerName : string,
  sampleTypeId : number,
  sampleType: string,
  sampleSubTypeId : number,
  sampleSubType : string,
  brandId : number,
  brandName : string,
  costRef: string,
  m3StyleNo: string,
  contact:string,
  extension: string,
  samValue : number,
  dmmId : number,
  dmmEmployee : string,
  technicianId : number,
  techEmployee : string,
  product : string,
  type : string,
  conversion : string,
  madeIn : string,
  facilityId : number,
  status: SampleDevelopmentStatusEnum,
  ){
    this.SampleRequestId = SampleRequestId
    this.locationId = locationId
    this.locationName = locationName
    this.requestNo = requestNo
    this.styleId = styleId
    this.style = style
    this.pchId = pchId
    this.profitControlHead = profitControlHead
    this.buyerId = buyerId
    this.buyerName = buyerName
    this.sampleTypeId = sampleTypeId
    this.sampleType = sampleType
    this.sampleSubType = sampleSubType
    this.brandId = brandId
    this.brandName = brandName
    this.costRef = costRef
    this.m3StyleNo = m3StyleNo
    this.contact = contact
    this.extension = extension
    this.samValue = samValue
    this.dmmId = dmmId
    this.dmmEmployee = dmmEmployee
    this.technicianId = technicianId
    this.techEmployee = techEmployee
    this.product = product
    this.type = type
    this.conversion = conversion
    this.madeIn = madeIn
    this.facilityId = facilityId
    this.status = status
  }

}

