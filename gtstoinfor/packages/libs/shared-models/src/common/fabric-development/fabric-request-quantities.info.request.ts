import { StatusEnum } from "../../enum"
import { FabricItemInfoRequest } from "./fabric-request-items-info.request";

export class FabricQuantitiesInfo {
    styleId : number;
    colorId: number;
    garmemtQuantity : number;
    comsumption:number;
    wastage:number;
    fabricQuantity:number;
    uomId:number;
    FileName: string;
    FilePath: string;
    remarks: string;
    itemsinfo:FabricItemInfoRequest[];
    status?: StatusEnum;
    fabricRequestQualityInfoId?: number;

    constructor(styleId : number,
        colorId: number,
        garmemtQuantity : number,
        comsumption:number,
        wastage:number,
        fabricQuantity:number,
        uomId:number,
        FileName: string,
        FilePath: string,
        remarks: string,
        itemsinfo:FabricItemInfoRequest[],
        status?: StatusEnum,
        fabricRequestQualityInfoId?: number
    ){
        this.styleId  = styleId
        this.colorId = colorId
        this.garmemtQuantity = garmemtQuantity
        this.comsumption = comsumption
        this.wastage = wastage
        this.fabricQuantity = fabricQuantity
        this.uomId = uomId
        this.FileName = FileName
         this.FilePath = FilePath
         this.remarks = remarks
         this.status = status
         this.fabricRequestQualityInfoId = fabricRequestQualityInfoId

    }
}