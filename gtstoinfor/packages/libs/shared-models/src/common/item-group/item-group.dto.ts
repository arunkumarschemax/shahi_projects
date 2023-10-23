import { ApiProperty } from "@nestjs/swagger";
import { ItemGroupEnum } from "../../enum";


export class ItemGroupDto {
    itemGroupId: number;
    
    // itemGroup: ItemGroupEnum;

    isActive: boolean;

    createdAt : Date | any;

    createdUser : string;

    updatedAt : Date | any;

    updatedUser : string;

    versionFlag : number;

    constructor(itemGroupId:number,itemGroup:ItemGroupEnum,isActive: boolean,createdUser : string,updatedUser : string,versionFlag : number){
    this.itemGroupId=itemGroupId
    // this.itemGroup=itemGroup
    this.createdUser=createdUser
    this.isActive=isActive
    this.updatedUser = updatedUser
    this.versionFlag = versionFlag

}
}
