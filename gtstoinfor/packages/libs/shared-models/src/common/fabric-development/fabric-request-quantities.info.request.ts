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
    uid:string
    FileName: string;
    FilePath: string;
    remarks: string;
    itemsinfo:FabricItemInfoRequest[];
    file?:any
    status?: StatusEnum;
    fabricRequestQualityInfoId?: number;

    constructor(styleId : number,
        colorId: number,
        garmemtQuantity : number,
        comsumption:number,
        wastage:number,
        fabricQuantity:number,
        uomId:number,
        uid:string,
        FileName: string,
        FilePath: string,
        remarks: string,
        itemsinfo:FabricItemInfoRequest[],
        file?:any,
        status?: StatusEnum,
        fabricRequestQualityInfoId?: number
    ){
        this.styleId  = styleId
        this.colorId = colorId
        this.garmemtQuantity = garmemtQuantity
        this.comsumption = comsumption
        this.wastage = wastage
        this.fabricQuantity = fabricQuantity
        this.uid = uid
        this.uomId = uomId
        this.file = file
        this.FileName = FileName
         this.FilePath = FilePath
         this.remarks = remarks
         this.status = status
         this.itemsinfo = itemsinfo
         this.fabricRequestQualityInfoId = fabricRequestQualityInfoId

    }
}