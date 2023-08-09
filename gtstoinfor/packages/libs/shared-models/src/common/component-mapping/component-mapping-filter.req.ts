export class ComponentMappingFilterReq{
    styleId?:number;
    garmentCategoryId?: number;
    garmentId?:number;

    constructor(styleId?:number, garmentCategoryId?: number, garmentId?:number){
        this.styleId = styleId;
        this.garmentCategoryId = garmentCategoryId;
        this.garmentId = garmentId;
    }

}