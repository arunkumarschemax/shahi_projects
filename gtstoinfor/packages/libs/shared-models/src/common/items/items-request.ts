export class ItemsDto{
    itemId:number;
    item:string;
    consumptionrequired:string;
    consumption:string;
    wastage:string;
    moq:string;
    createdUser:string;
    updatedUser:string;
    isActive:boolean;

    /**
     * 
     * @param itemId This is a number
     * @param item This is a string
     * @param createdUser This is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */
    
    constructor(itemId:number,item:string,consumptionrequired:string, consumption:string,wastage:string, moq:string,createdUser:string,updatedUser:string,isActive:boolean){
        this.itemId = itemId;
        this.item = item;
        this.consumptionrequired=consumptionrequired;
        this.consumption=consumption;
        this.moq=moq;
        this.wastage=wastage;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;

        this.isActive = isActive;
    }
}