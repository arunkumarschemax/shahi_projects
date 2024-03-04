import { FabricCategoryEnum } from "../../enum";

export class FabricCategory{
    type:FabricCategoryEnum;
    
    constructor(type:FabricCategoryEnum){
        this.type = type;
    }
}
