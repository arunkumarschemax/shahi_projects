import { execFile } from "child_process";
import { ItemTypeEnum, LogoEnum, PartEnum, m3ItemsContentEnum } from "../../enum";

export class M3trimsDTO {
    m3ItemsId?:number;
    buyerId?:number;
    itemCode?:string;
    categoryId?:number;
    colorId?:number;
    contentId?:number;
    finishId?:number;
    holeId?:number;
    logo?:LogoEnum;
    part?:PartEnum;
    qualityId?:number;
    structureId?:number;
    thicknessId?:number;
    typeId?:number;
    uomId?:number;
    varietyId?:number;
    trimCategoryId?:number;
    trimMappingId?:any;
    buyerCode?:any
    itemType?: ItemTypeEnum
    description?: string
    extRefNumber?: string
    

    constructor(m3ItemsId?:number,buyerId?:number,
        itemCode?:string,
        categoryId?:number,
        colorId?:number,
        contentId?:number,
        finishId?:number,
        holeId?:number,
        logo?:LogoEnum,
        part?:PartEnum,
        qualityId?:number,
        structureId?:number,
        thicknessId?:number,
        typeId?:number,
        uomId?:number,
        varietyId?:number,
        trimCategoryId?:number,
        trimMappingId?:any,
        buyerCode?: any,
        itemType?:ItemTypeEnum,
        description?: string,
        extRefNumber?: string,
    ) {
        this.m3ItemsId=m3ItemsId;
        this.buyerId=buyerId;
        this.itemCode=itemCode;
        this.categoryId=categoryId;
        this.colorId=colorId;
        this.contentId=contentId;
        this.finishId=finishId;
        this.holeId=holeId;
        this.logo=logo;
        this.part=part;
        this.qualityId=qualityId;
        this.structureId=structureId;
        this.thicknessId=thicknessId;
        this.typeId=typeId;
        this.uomId=uomId;
        this.varietyId=varietyId;
        this.trimCategoryId=trimCategoryId;
        this.trimMappingId=trimMappingId;
        this.buyerCode = buyerCode
        this.itemType = itemType
        this.description = description
        this.extRefNumber = extRefNumber
       
       
    }
}
