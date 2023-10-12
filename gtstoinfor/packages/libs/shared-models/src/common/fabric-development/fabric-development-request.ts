import { StatusEnum } from "../../enum";
import { FabricRequestQualitiesRequest } from "./fabric-request-qualities.request";

export class FabricDevelopmentRequestModel{
    locationId: number;
    styleId: number;
    pchId: number;
    buyerId: number;
    type: string;
    sampleTypeId: number;
    remarks: string;
    fabricResponsible: number;
    facilityId: number;
    lightSourcePrimary: string;
    lightSourceSecondary: string;
    lightSourceTertiary: string;
    fileName: string;
    filePath: string;
    qualities:FabricRequestQualitiesRequest[]
    status?: StatusEnum;
    requestNo?: number;    
    fabricRequestId?: number;


   
    constructor(locationId: number,
        styleId: number,
        pchId: number,
        buyerId: number,
        type: string,
        sampleTypeId: number,
        remarks: string,
        fabricResponsible: number,
        facilityId: number,
        lightSourcePrimary: string,
        lightSourceSecondary: string,
        lightSourceTertiary: string,
        fileName: string,
        filePath: string,
        qualities:FabricRequestQualitiesRequest[],
        status?: StatusEnum,
        requestNo?: number,    
        fabricRequestId?: number){
      
        this.locationId = locationId
        this.styleId = styleId
        this.pchId = pchId
        this.buyerId = buyerId
        this.type = type
        this.sampleTypeId = sampleTypeId
        this.remarks = remarks
        this.fabricResponsible = fabricResponsible
        this.facilityId = facilityId
        this.lightSourcePrimary = lightSourcePrimary
        this.lightSourceSecondary = lightSourceSecondary
        this.lightSourceTertiary = lightSourceTertiary
        this.fileName = fileName
        this.filePath = filePath
        this.qualities = qualities
        this.status = status
        this.requestNo = requestNo
        this.fabricRequestId = fabricRequestId

    }
}