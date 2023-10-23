import { ItemGroupEnum } from "../../enum";

export class ItemGroupDropDownDto{
    itemGroupId : number;
    // itemGroup : ItemGroupEnum;
    
    
    constructor(itemGroupId : number,itemGroup : ItemGroupEnum){
        this.itemGroupId = itemGroupId;
        // this.itemGroup = itemGroup;
    }
}