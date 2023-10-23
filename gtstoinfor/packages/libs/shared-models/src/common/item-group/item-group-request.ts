import { ItemGroupEnum } from "../../enum";

export class ItemGroupRequestDto{
    itemGroupId:number;
    updatedUser:string;
    itemGroup:ItemGroupEnum;
    isActive:boolean;
    versionFlag:number;

    /**
     * 
     * @param itemGroupId This is a number
     * @param itemGroup is a string
     * @param updatedUser This is a string
     * @param isActive This is a boolean
     */

    constructor(itemGroupId:number,itemGroup:ItemGroupEnum,updatedUser:string, size:string, isActive:boolean,versionFlag:number){
        this.itemGroupId = itemGroupId;
        this.updatedUser = updatedUser;
        this.itemGroup = itemGroup;
        this.isActive=isActive;
        this.versionFlag=versionFlag
   }
    }