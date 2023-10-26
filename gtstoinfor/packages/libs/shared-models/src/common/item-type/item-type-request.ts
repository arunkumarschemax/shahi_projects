export class ItemTypeRequestDto{
    itemTypeId:number;
    updatedUser:string;
    itemType:string;
    isActive:boolean;
    versionFlag:number;

    /**
     * 
     * @param itemTypeId This is a number
     * @param itemType is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */

    constructor(itemTypeId:number,itemType:string ,isActive:boolean,versionFlag:number){
        this.itemTypeId = itemTypeId;
        this.itemType=itemType;
        this.isActive=isActive;
        this.versionFlag=versionFlag
   }
    }