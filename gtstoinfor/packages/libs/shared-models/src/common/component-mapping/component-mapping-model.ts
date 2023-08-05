import { ComponentInfoModel } from "./component-info.model";

export class ComponentMappingModel{
    componentMappingId: number;
    styleId: number;
    garmentCategoryId: number;
    garmentId: number;
    componentDeatils: ComponentInfoModel[];
    createdUser: string;
    updatedUser: string;
    isActive: boolean
    versionFlag: number;
    style?:string;
    garmentCategory ?: string;
    garment?: string;


    constructor(componentMappingId: number,styleId: number,garmentCategoryId: number,garmentId: number,componentDeatils: ComponentInfoModel[],createdUser: string,updatedUser: string,isActive: boolean,versionFlag: number,style?:string,garmentCategory ?: string,garment?: string){
        this.componentMappingId = componentMappingId;
        this.styleId = styleId;
        this.garmentCategoryId = garmentCategoryId;
        this.garmentId = garmentId;
        this.componentDeatils = componentDeatils
        this.createdUser = createdUser
        this.updatedUser = updatedUser
        this.isActive = isActive
        this.versionFlag = versionFlag
        this.style = style
        this.garmentCategory = garmentCategory
        this.garment = garment
    }
}