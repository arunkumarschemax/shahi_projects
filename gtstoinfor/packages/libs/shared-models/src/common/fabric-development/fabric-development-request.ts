import { StatusEnum } from "../../enum";

export class FabricDevelopmentRequest{
    locationId: number;
    styleId: number;
    pchId: number;
    buyerId: number;
    fabricTypeId: number;
    sampleTypeId: number;
    remarks: string;
    fabricResponsible: number;
    facilityId: number;
    lightSourcePrimary: string;
    lightSourceSecondary: string;
    lightSourceTertiary: string;
    FileName: string;
    FilePath: string;
    qualities:string;
    status?: StatusEnum;
    requestNo?: number;    
    fabricRequestId?: number;


   
    constructor(locationId: number,
        styleId: number,
        pchId: number,
        buyerId: number,
        fabricTypeId: number,
        sampleTypeId: number,
        remarks: string,
        fabricResponsible: number,
        facilityId: number,
        lightSourcePrimary: string,
        lightSourceSecondary: string,
        lightSourceTertiary: string,
        FileName: string,
        FilePath: string,
        qualities:string,
        status?: StatusEnum,
        requestNo?: number,    
        fabricRequestId?: number){
      
        this.locationId = locationId
        this.styleId = styleId
        this.pchId = pchId
        this.buyerId = buyerId
        this.fabricTypeId = fabricTypeId
        this.sampleTypeId = sampleTypeId
        this.remarks = remarks
        this.fabricResponsible = fabricResponsible
        this.facilityId = facilityId
        this.lightSourcePrimary = lightSourcePrimary
        this.lightSourceSecondary = lightSourceSecondary
        this.lightSourceTertiary = lightSourceTertiary
        this.FileName = FileName
        this.FilePath = FilePath
        this.qualities = qualities
        this.status = status
        this.requestNo = requestNo
        this.fabricRequestId = fabricRequestId

    }
}