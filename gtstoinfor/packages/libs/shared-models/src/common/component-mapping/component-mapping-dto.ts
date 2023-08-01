import { ComponentInfoDto } from "./component-info.dto";

export class ComponentMappingDto{
    componentMappingId: number;
    styleId: number;
    // style?:string;
    garmentCategoryId: number;
    // garmentCategory ?: string;
    garmentId: number;
    // garment?: string;
    componentDeatils: ComponentInfoDto[];

    constructor(componentMappingId: number,styleId: number,garmentCategoryId: number,garmentId: number,componentDeatils: ComponentInfoDto[]){
        this.componentMappingId = componentMappingId;
        this.styleId = styleId;
        this.garmentCategoryId = garmentCategoryId;
        this.garmentId = garmentId;
        this.componentDeatils = componentDeatils
    }
}