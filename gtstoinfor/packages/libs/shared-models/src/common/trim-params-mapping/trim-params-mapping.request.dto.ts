import { ItemTypeEnum } from "../../enum";

export class TrimParamsMappingRequestDto{
    
    trimParamsMapping: number;
    category:boolean
    trimId:number;
    color:boolean
    content:boolean
    finish:boolean
    hole:boolean
    logo:boolean
    part:boolean
    quality:boolean
    structure:boolean
    thickness:boolean
    type:boolean
    uom:boolean
    variety:boolean
    ply:boolean
    parts:boolean
    shape:boolean
    length:boolean
    line:boolean
    slider:boolean
    buyer:boolean
    createdUser: string;
    isActive: boolean;  
    updatedUser: string;
    versionFlag: number;
trimType:ItemTypeEnum
    constructor( trimParamsMapping: number,
        category:boolean,
        trimId:number,
        color:boolean,
        content:boolean,
        finish:boolean,
        hole:boolean,
        logo:boolean,
        part:boolean,
        quality:boolean,
        structure:boolean,
        thickness:boolean,
        type:boolean,
        uom:boolean,
        variety:boolean,
        createdUser: string,
        isActive: boolean,  
        updatedUser: string,
        ply:boolean,
    parts:boolean,
    shape:boolean,
    length:boolean,
    line:boolean,
    slider:boolean,
    buyer:boolean,
        versionFlag: number,
        trimType:ItemTypeEnum
){
            this.trimParamsMapping = trimParamsMapping;
            this.category = category;
            this.trimId = trimId;
            this.color = color;
            this.content = content;
            this.finish = finish;
            this.hole = hole;
            this.logo = logo;
            this.part = part;
            this.quality = quality;
            this.structure = structure;
            this.thickness = thickness;
            this.type = type;
            this.uom = uom;
            this.variety = variety;
            this.createdUser = createdUser;
            this.isActive = isActive;  
            this.updatedUser = updatedUser;
            this.versionFlag = versionFlag;
            this.buyer = buyer;
            this.length = length
            this.line = line
            this.ply = ply
            this.parts = parts
            this.shape = shape
            this.slider = slider
            this.trimType = trimType
    }
}